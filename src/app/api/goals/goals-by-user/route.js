import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    const cookieStore = cookies();
    const sessionId = cookieStore.get("sessionId")?.value;

    if (!sessionId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Ambil userId dari session yang valid
    const session = await prisma.session.findFirst({
      where: { id: sessionId },
      include: { user: true },
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const userId = session.user.id;

    // Ambil goals berdasarkan userId
    const goals = await prisma.goal.findMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json({ goals });
  } catch (error) {
    console.error("Error fetching goals:", error);
    return NextResponse.json(
      { error: "Failed to fetch goals" },
      { status: 500 }
    );
  }
}
