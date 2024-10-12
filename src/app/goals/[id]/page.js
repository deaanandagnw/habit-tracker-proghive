"use client";

import { useState, useEffect } from "react";
import { getGoalDetails, updateActivityStatus } from "./actions";

export default function GoalDetailsPage({ params }) {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [goalDetails, setGoalDetails] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchGoalDetails(selectedDate);
  }, [selectedDate]);

  //   async function fetchGoalDetails(date) {
  //     const details = await getGoalDetails(params.id, new Date(date));

  //     // Update state with the details
  //     setGoalDetails(details.goal);
  //     setActivities(details.activities);
  //   }

  async function fetchGoalDetails(date) {
    const details = await getGoalDetails(params.id, new Date(date));

    // Get the user's selectedDate from the parameter
    const selectedDate = new Date(date).setHours(0, 0, 0, 0);

    // Get startTime and endTime from the goal
    const startTime = new Date(details.goal.startTime).setHours(0, 0, 0, 0);
    const endTime = new Date(details.goal.endTime).setHours(0, 0, 0, 0);

    // Check if the selectedDate is between startTime and endTime (both included)
    if (selectedDate >= startTime && selectedDate <= endTime) {
      setGoalDetails(details.goal);
      setActivities(details.activities);
    } else {
      // If the selected date is outside the range, set activities as an empty array
      setGoalDetails(details.goal);
      setActivities([]); // No activities for this date
    }
  }

  async function handleActivityToggle(activityId) {
    const activity = activities.find((a) => a.id === activityId);
    const newStatus = !activity.isCompleted;

    // Pass the selected date when updating the activity status
    await updateActivityStatus(activityId, newStatus, selectedDate);
    fetchGoalDetails(selectedDate);
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {goalDetails?.title || "Loading..."}
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <label
            htmlFor="date-picker"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Date
          </label>
          <input
            type="date"
            id="date-picker"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2">
            Activities for {new Date(selectedDate).toDateString()}
          </h2>
          {activities.length > 0 ? (
            <ul>
              {activities.map((activity) => (
                <li key={activity.id} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={activity.isCompleted}
                    onChange={() => handleActivityToggle(activity.id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span>{activity.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No activities for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
}
