"use client";
import { useEffect, useState } from "react";

export function TotalGoals() {
  const [totalGoals, setTotalGoals] = useState(null);

  useEffect(() => {
    const fetchTotalGoals = async () => {
      try {
        const response = await fetch(`/api/goals/total-goals`);
        const data = await response.json();

        if (response.ok) {
          setTotalGoals(data.totalGoals);
        } else {
          console.error("Failed to fetch total goals:", data.error);
        }
      } catch (error) {
        console.error("Error fetching total goals:", error);
      }
    };

    fetchTotalGoals();
  }, []);

  return (
    <div className="w-[250px] h-[150px] bg-white shadow-md p-5 rounded-xl">
      <h3 className="text-base text-black">Total Goals</h3>
      <p className="text-xl font-bold text-black mt-5">
        {totalGoals !== null ? totalGoals : "Loading..."}
      </p>
    </div>
  );
}
