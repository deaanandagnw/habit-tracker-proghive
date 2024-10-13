import { NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma'; 

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    console.log('UserId dari query:', userId); //

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const goals = await prisma.goal.findMany({
      where: {
        userId: userId, 
      },
      select: {
        title: true,
        description: true,
        startTime: true,
        endTime: true,
      },
    });

    return NextResponse.json({ goals });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch goals" }, { status: 500 });
  }
}
