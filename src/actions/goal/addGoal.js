"use server";

import { cookies } from "next/headers";
import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

async function addGoal(formData) {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  // Check if sessionId exists in the cookie
  if (!sessionId) {
    return redirect("/login");
  }

  // Query the session from the database
  const isSessionValid = await prisma.session.findFirst({
    where: { id: sessionId },
    include: { user: true },
  });

  // Redirect if the session is not valid or user data is missing
  if (!isSessionValid || !isSessionValid.user) {
    return redirect("/login");
  }

  const title = formData.get("title");
  const description = formData.get("description");
  const categoryId = formData.get("category");
  const startTime = formData.get("startTime");
  const endTime = formData.get("endTime");
  const userId = isSessionValid.user.id;
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
