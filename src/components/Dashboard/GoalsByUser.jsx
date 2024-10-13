"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export function GoalsByUser() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoalsByUser = async () => {
      try {
        const response = await fetch("/api/goals/goals-by-user");
        const data = await response.json();
        console.log("Data dari server:", data);
        if (data.goals) {
          setGoals(data.goals);
        } else {
          console.error("Error fetching goals:", data.error);
        }
      } catch (error) {
        console.error("Error fetching goals by user:", error);
      }
    };
    fetchGoalsByUser();
  }, []);

  return (
    <div className="w-full bg-white shadow-md p-5 rounded-xl">
      <h3 className="text-lg font-bold text-black">Goals by User</h3>
      {goals.length > 0 ? (
        <ul>
          {goals.map((goal) => (
            <li
              key={goal.id}
              className="my-4 p-4 bg-white border-l-4 border-secondary/40 hover:bg-primary rounded-md"
            >
              <Link href={`/goals/${goal.id}`} className="block">
                <h4 className="text-xl font-semibold text-black">
                  {goal.title}
                </h4>
                <p className="text-sm text-gray-700 mt-1">
                  {goal.description || "No description"}
                </p>
                <div className="mt-2 flex justify-between text-sm text-gray-500">
                  <p>Start: {new Date(goal.startTime).toLocaleString()}</p>
                  {goal.endTime && (
                    <p>End: {new Date(goal.endTime).toLocaleString()}</p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No goals available for this user.</p>
      )}
    </div>
  );
}
