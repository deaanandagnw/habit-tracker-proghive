"use client";

import { useState, useEffect } from "react";
import { getGoalDetails, updateActivityStatus } from "./actions";

export default function GoalDetailsPage({ params }) {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [goalDetails, setGoalDetails] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoalDetails(selectedDate);
  }, [selectedDate]);

  async function fetchGoalDetails(date) {
    setLoading(true); // Set loading to true before fetching data
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
    setLoading(false); // Set loading to false after fetching data
  }

  async function handleActivityToggle(activityId) {
    const activity = activities.find((a) => a.id === activityId);
    const newStatus = !activity.isCompleted;

    // Pass the selected date when updating the activity status
    await updateActivityStatus(activityId, newStatus, selectedDate);
    fetchGoalDetails(selectedDate);
  }

  return (
    <div className="">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-secondary/70">Loading...</p>
        </div>
      ) : (
        <div className="flex gap-6">
          <div className="gap-x-6">
            <div className="h-fit">
              <p className="text-xl font-bold mb-4 mt-1">Today</p>
              <p className="-mt-3 text-secondary/70">
                {new Date(selectedDate).toDateString()}
              </p>
              <div className="w-full mt-3">
                <input
                  type="date"
                  id="date-picker"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="mt-5 top-0 w-full gap-6">
              {goalDetails ? (
                <div
                  key={goalDetails.id}
                  className="bg-primary rounded-lg p-6 w-full hover:cursor-pointer"
                >
                  <h2 className="text-lg font-semibold mb-4">
                    {goalDetails.title}
                  </h2>
                  <div className="bg-white shadow-sm rounded-lg p-3 my-2">
                    <p className="text-sm font-normal text-secondary/70 mb-1">
                      {goalDetails.description}
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-col md:flex-row md:justify-between mt-4 bg-secondary/10 p-3 rounded-md">
                      <div className="flex items-center mb-2 md:mb-0">
                        <p className=" text-xs font-medium text-secondary">
                          <span className="font-semibold">Start:</span>{" "}
                          {new Date(goalDetails.startTime).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className=" text-xs font-medium text-secondary">
                          <span className="font-semibold">End:</span>{" "}
                          {new Date(goalDetails.endTime).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-secondary/70">
                  No goal details available for this date.
                </p>
              )}
            </div>
          </div>
          <div className="bg-primaryGreenLight flex-1 mt-[8.4rem] rounded-lg p-6 pt-4">
            <div className="p-2 rounded-lg w-full">
              <h2 className="text-lg font-semibold mb-4">Related Activities</h2>
              {activities.length > 0 ? (
                <ul className="space-y-3">
                  {activities.map((activity) => (
                    <li
                      key={activity.id}
                      className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm"
                    >
                      <input
                        type="checkbox"
                        checked={activity.isCompleted}
                        onChange={() => handleActivityToggle(activity.id)}
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-0"
                      />
                      <span className="text-sm text-gray-700">
                        {activity.title}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center text-secondary bg-white p-6 rounded-lg mt-3">
                  <div className="text-3xl mb-3 text-[#80BBBE]">❌</div>
                  <h3 className="text-lg font-semibold text-[#55A0AC]">
                    Oops! Something went wrong
                  </h3>
                  <p className="text-sm text-secondary/70 mt-2 text-center">
                    This date is out of the goal's vulnerable time. Maybe try
                    creating a new goal?
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
