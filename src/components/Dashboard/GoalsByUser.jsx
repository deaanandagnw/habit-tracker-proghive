"use client";
import { useEffect, useState } from "react";

export function GoalsByUser({ userId }) {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoalsByUser = async () => {
      try {
        const response = await fetch(`/api/goals/goals-by-user?userId=${userId}`);
        const data = await response.json();
        console.log('Data dari server:', data); 

        if (data.goals) {
          setGoals(data.goals);
        }
      } catch (error) {
        console.error("Error fetching goals by user:", error);
      }
    };

    fetchGoalsByUser();
  }, [userId]);

  return (
    <div className="w-full bg-white shadow-md p-5 rounded-xl">
      <h3 className="text-lg font-bold text-black">Goals by User</h3>

      {goals.length > 0 ? (
        <ul>
          {goals.map((goal, index) => (
            <li key={index} className="my-4 shadow-md">
              <h4 className="text-xl font-bold">{goal.title}</h4>
              <p className="text-sm text-gray-600">{goal.description || "No description"}</p>
              <p className="text-sm text-gray-600">
                Start: {new Date(goal.startTime).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                End: {new Date(goal.endTime).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No goals available for this user.</p>
      )}
    </div>
  );
}
