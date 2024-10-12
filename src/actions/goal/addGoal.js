"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

async function addGoal(formData) {
  // Get the session
  const session = await prisma.session.findFirst();

  // Check if the user is authenticated
  if (!session || !session.userId) {
    throw new Error("You must be logged in to create a goal");
  }

  const title = formData.get("title");
  const description = formData.get("description");
  const categoryId = formData.get("category");
  const startTime = formData.get("startTime");
  const endTime = formData.get("endTime");
  const userId = session.userId;
  try {
    await prisma.goal.create({
      data: {
        title,
        description,
        categoryId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        userId,
      },
    });

    revalidatePath("/goals");
  } catch (error) {
    console.error("Failed to create goal:", error);
    throw new Error("Failed to create goal. Please try again.");
  }
}

export default addGoal;
