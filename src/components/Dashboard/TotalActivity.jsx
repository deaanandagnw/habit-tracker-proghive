"use client";
import { useEffect, useState } from "react";

export function TotalActivity() {
  const [totalActivity, setTotalActivity] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(`/api/activity/total-activity`);
        const data = await response.json();

        if (response.ok) {
          setTotalActivity(data.totalActivity);
        } else {
          console.error("Failed to fetch total activity:", data.error);
        }
      } catch (error) {
        console.error("Error fetching total activity:", error);
      }
    };
    fetchActivity();
  }, []);

  return (
    <div className="w-[250px] h-[150px] bg-white shadow-md p-5 rounded-xl">
      <h3 className="text-base text-black">Total Activity</h3>
      <p className="text-xl font-bold text-black mt-5">{totalActivity !== null ? totalActivity : "Loading..."}</p>
    </div>
  );
}
