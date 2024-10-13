"use client";
import { useEffect, useState } from "react";

export function TotalGoals({userId}) {
  const [totalGoals, setTotalGoals] = useState(null);

  useEffect(() => {
    const fetchTotalGoals = async () => {
      try {
        const response = await fetch(`/api/goals/total-goals?userId=${userId}`);
        const data = await response.json();
        setTotalGoals(data.totalGoals);
      } catch (error) {
        console.error("Error fetching total goals:", error);
      }
    };

    fetchTotalGoals();
  }, [{userId}]);

  return (
    <div className="w-[250px] h-[150px] bg-white shadow-md p-5 rounded-xl">
      <h3 className="text-base text-black">Total Goals</h3>
      <p className="text-xl font-bold text-black mt-5">{totalGoals !== null ? totalGoals : "Loading..."}</p>
    </div>
  );
}
