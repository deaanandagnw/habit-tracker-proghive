import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export async function GET(req) {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  // Check if sessionId exists in the cookie
  if (!sessionId) {
    return redirect("/login");
  }

  try {
    const session = await prisma.session.findFirst({
      where: { id: sessionId },
      include: { user: true },
    });

    // Redirect if the session is not valid or user data is missing
    if (!session || !session.user) {
      return redirect("/login");
    }

    const userId = session.user.id;

    // Get goals or other user-related data
    const totalGoals = await prisma.goal.count({
      where: {
        userId: userId, // Filter goals by the user's ID
      },
    });

    return NextResponse.json({ totalGoals });
  } catch (error) {
    console.error("Error fetching goals:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
