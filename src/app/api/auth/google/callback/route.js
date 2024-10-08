import { cookies } from "next/headers";
import { google } from "@/utils/arctic";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import crypto from "crypto"; // Importing crypto for token generation

export async function GET(req) {
  const { searchParams } = new URL(req.url); // Get query parameters

  const code = searchParams.get("code"); // Get code from Google
  const codeVerifier = cookies().get("codeVerifier")?.value; // Get codeVerifier from cookies

  // Validate the codeVerifier and code => jwt (accessToken)
  const tokens = await google.validateAuthorizationCode(code, codeVerifier);

  // Get user info
  const res = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  });

  const userData = await res.json();
  console.log(userData);

  // Check if user exists in the database
  const findUser = await prisma.user.findFirst({
    where: {
      email: userData.email,
    },
  });

  // Generate a secure token for the session
  const token = crypto.randomBytes(32).toString("hex"); // Generate a random token

  // If the user exists, create a session
  if (findUser) {
    const session = await prisma.session.create({
      data: {
        userId: findUser.id,
        token: token, // Include the generated token
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30-day expiration
      },
    });

    cookies().set("sessionId", session.id); // Store session ID in cookies
    redirect("/dashboard"); // Redirect to dashboard
  }

  // If the user does not exist, create a new user
  const newUser = await prisma.user.create({
    data: {
      username: userData.name,
      email: userData.email,
      gender: "",
      country: "",
      biodata: ""
    },
  });

  // Create session for the new user
  const session = await prisma.session.create({
    data: {
      userId: newUser.id,
      token: token, // Include the generated token
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30-day expiration
    },
  });

  cookies().set("sessionId", session.id); // Store session ID in cookies
  redirect("/dashboard"); // Redirect to dashboard
}
