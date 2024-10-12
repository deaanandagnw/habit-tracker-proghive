// components/DeleteButton.js
"use client";

import { GoTrash } from "react-icons/go";
import { deleteActivity } from "@/actions/activity/deleteActivity";
import { useRouter } from "next/navigation";

export default function DeleteButton({ activityId }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteActivity(activityId);
      // router.refresh(); // Refresh the page to update the state
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  return (
    <div
      className="text-red-700 flex items-center gap-x-2 border hover:bg-red-500 hover:cursor-pointer hover:border-white hover:text-white px-3 py-2 rounded-lg text-xs"
      onClick={handleDelete}
    >
      <GoTrash className="text-lg" /> Delete
    </div>
  );
}
