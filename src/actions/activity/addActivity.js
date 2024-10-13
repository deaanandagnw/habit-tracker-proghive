"use server";

import { cookies } from "next/headers";
import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

async function addActivity(formData) {
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

  const goals = await prisma.goal.findMany({
    include: { category: true },
    where: {
      userId: isSessionValid.user.id,
    },
  });

  const title = formData.get("title");
  const description = formData.get("description");
  const goalId = goals[goals.length - 1].id;
  const userId = isSessionValid.user.id;

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
