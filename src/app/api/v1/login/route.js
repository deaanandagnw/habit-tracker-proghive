import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto"; // For generating a token

export async function POST(req) {
  const { email, password } = await req.json();

  // 1. Find user in the database based on email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return new Response(
      JSON.stringify({ message: "Invalid Credentials" }),
      { status: 422, headers: { "Content-Type": "application/json" } }
    );
  }

  // 2. Check if the password matches
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return new Response(
      JSON.stringify({ message: "Invalid Credentials" }),
      { status: 422, headers: { "Content-Type": "application/json" } }
    );
  }

  // 3. Generate a session token
  const sessionToken = crypto.randomBytes(64).toString("hex");

  // 4. Delete any existing session for the user (if needed)
  const existedSession = await prisma.session.findFirst({
    where: { userId: user.id },
  });
  if (existedSession) {
    await prisma.session.delete({
      where: { id: existedSession.id },
    });
  }

  // 5. Create a new session
  const session = await prisma.session.create({
    data: {
      userId: user.id,
      token: sessionToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30-day expiration
    },
  });

  // 6. Return success response
  return new Response(
    JSON.stringify({ message: "Login success", sessionId: session.id }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
