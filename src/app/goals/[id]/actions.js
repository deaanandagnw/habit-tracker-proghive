"use server";

import { prisma } from "@/utils/prisma";

export async function getGoalDetails(goalId, date) {
  const formattedDate = new Date(date).toISOString();

  const goal = await prisma.goal.findUnique({
    where: { id: goalId },
    include: {
      activities: {
        include: {
          logs: {
            where: {
              date: formattedDate, // Pastikan kita hanya mengambil log pada tanggal yang dipilih
            },
          },
        },
      },
      category: true,
    },
  });

  // Update activity objects to include isCompleted based on logs
  const activities = goal.activities.map((activity) => {
    const log = activity.logs[0]; // Ambil log pertama untuk tanggal yang dipilih
    return {
      ...activity,
      isCompleted: log ? log.isCompleted : false, // Jika ada log, pakai nilai dari log; jika tidak, default false
    };
  });

  return { goal, activities };
}

export async function updateActivityStatus(activityId, isCompleted, date) {
  // Convert date to the proper format (only the date part)
  const formattedDate = new Date(date).toISOString();

  // Check if the log entry exists
  const existingLog = await prisma.ActivityLog.findFirst({
    where: {
      activityId,
      date: {
        // Ensure we match the date correctly, considering the time
        gte: new Date(formattedDate), // Start of the day
        lt: new Date(
          new Date(formattedDate).setDate(new Date(formattedDate).getDate() + 1)
        ), // Start of the next day
      },
    },
  });

  if (existingLog) {
    // If the log entry exists, update it
    await prisma.ActivityLog.update({
      where: { id: existingLog.id }, // Use the ID of the existing log
      data: {
        isCompleted,
        updatedAt: new Date(),
      },
    });
  } else {
    // If the log entry does not exist, create it
    await prisma.ActivityLog.create({
      data: {
        activityId,
        date: formattedDate,
        isCompleted,
      },
    });
  }
}
