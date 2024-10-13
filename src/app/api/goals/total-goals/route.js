import prisma from "@/utils/prisma";
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const totalGoals = await prisma.goal.count({
      where: {
        userId: userId, // Filter by userId
      },
    });

    return NextResponse.json({ totalGoals });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
