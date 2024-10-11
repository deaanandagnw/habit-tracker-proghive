"use client";
import { useState } from "react";

export function AddGoals() {
      const [goalTitle, setGoalTitle] = useState("");
      const [description, setDescription] = useState("");
      const [category, setCategory] = useState("");
      const [error, setError] = useState("");
      const [success, setSuccess] = useState(false);

      const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                  const res = await fetch("/api/goals", {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                              title: goalTitle,
                              description: description,
                              categoryId: '081ff885-f8e3-441d-8a7e-a73c5569ffb9',
                        }),
                  });

                  const result = await res.json();
                  if (result.id) {
                        setSuccess(true);
                        setGoalTitle("");
                        setDescription("");
                        setCategory("");
                  } else {
                        setError(result.message);
                  }
            } catch (error) {
                  setError("Something went wrong while submitting the goal.");
            }
      };

      return (
            <div className="flex flex-col">
                  <h5 className="font-semibold text-2xl text-dark">Add New Goal</h5>
                  <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3">
                        <div className="flex flex-col">
                              <label htmlFor="quoteTitle" className="text-lg text-[#55A0AC]">
                                    Goal Title
                              </label>
                              <input
                                    type="text"
                                    value={goalTitle}
                                    onChange={(e) => setGoalTitle(e.target.value)}
                                    className="w-[400px] p-2 border border-[#80BBBE] rounded-2xl focus:outline-none focus:border-[#55A0AC] mt-2"
                                    required
                              />
                        </div>

                        <div className="flex flex-col">
                              <label htmlFor="transcript" className="text-lg text-[#55A0AC]">
                                    Description
                              </label>
                              <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-[400px] p-2 border border-[#80BBBE] rounded-2xl focus:outline-none focus:border-[#55A0AC] mt-2 h-[150px]"
                                    required
                              ></textarea>
                        </div>

                        <div className="flex flex-col">
                              <label htmlFor="category" className="text-lg text-[#55A0AC]">
                                    Category
                              </label>
                              <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-[400px] p-2 border border-[#80BBBE] rounded-2xl focus:outline-none focus:border-[#55A0AC] mt-2"
                                    required
                              >
                                    <option value="">Select Category</option>
                                    <option value="Health">Health</option>
                                    <option value="Sport">Sport</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Personal Development">Personal Development</option>
                              </select>
                        </div>

                        <button
                              type="submit"
                              className="bg-[#AADC8D] text-secondary py-4 px-8 font-semibold rounded-3xl w-fit mt-4"
                        >
                              Submit
                        </button>
                  </form>

                  {success && <p className="text-green-600 mt-4">Goal added successfully!</p>}
                  {error && <p className="text-red-600 mt-4">Error: {error}</p>}
            </div>
      );
}
