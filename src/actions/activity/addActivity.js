"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

async function addActivity(formData) {
  // Get the session
  const session = await prisma.session.findFirst();

  // Check if the user is authenticated
  if (!session || !session.userId) {
    throw new Error("You must be logged in to create an activity");
  }

  const goals = await prisma.goal.findMany({
    include: { category: true },
    where: {
      userId: session.userId,
    },
  });

  const title = formData.get("title");
  const description = formData.get("description");
  const goalId = goals[goals.length - 1].id;
  const userId = session.userId;

  try {
    await prisma.activity.create({
      data: {
        title,
        description,
        userId,
        goalId,
      },
    });

    revalidatePath("/activities"); // Update the path if needed
  } catch (error) {
    console.error("Failed to create activity:", error);
    throw new Error("Failed to create activity. Please try again.");
  }
}

export default addActivity;
