import addActivity from "@/actions/activity/addActivity";
import addGoal from "@/actions/goal/addGoal";
import { cookies } from "next/headers";
import { prisma } from "@/utils/prisma";
import { GoTrash } from "react-icons/go";
import Link from "next/link";
import AddGoal from "../components/AddGoal";

export default async function Page({ userId }) {
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

  // Fetch goals directly based on userId
  const goals = await prisma.goal.findMany({
    include: { category: true, activities: true },
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Get the most recent goal (if it exists)
  const lastInsertedGoal = goals.length > 0 ? goals[0] : null;

  // Fetch categories for the goal form
  const categories = await prisma.category.findMany();

  // Fetch activities based on the most recent goal if it exists
  const activitiesByLastGoalId = lastInsertedGoal
    ? await prisma.activity.findMany({
        where: {
          goalId: lastInsertedGoal.id,
        },
      })
    : [];

  return (
    <main>
      <AddGoal />
    </main>
  );
}
