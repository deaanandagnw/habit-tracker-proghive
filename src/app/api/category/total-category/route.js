import prisma from "@/utils/prisma";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const totalCategory = await prisma.category.count();
    return NextResponse.json({ totalCategory });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
