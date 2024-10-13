"use client";
import { useEffect, useState } from "react";

export function TotalCategory() {
  const [totalCategory, setTotalCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch("/api/category/total-category");
        const data = await response.json();
        setTotalCategory(data.totalCategory);
      } catch (error) {
        console.error("Error fetching total Category:", error);
      }
    };

    fetchCategory();
  }, []);

  return (
    <div className="w-[250px] h-[150px] bg-white shadow-md p-5 rounded-xl">
      <h3 className="text-base text-black">Total Category</h3>
      <p className="text-xl font-bold text-black mt-5">{totalCategory !== null ? totalCategory : "Loading..."}</p>
    </div>
  );
}
