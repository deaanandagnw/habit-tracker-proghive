"use client";
import { useState } from "react";

export function AddGoals() {
      const [author, setAuthor] = useState("");
      const [quoteTitle, setQuoteTitle] = useState("");
      const [transcript, setTranscript] = useState("");
      const [error, setError] = useState("");
      const [success, setSuccess] = useState(false);

      const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                  const res = await fetch("/api/goals", {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                              author: author,
                              title: quoteTitle,
                              description: transcript,
                        }),
                  });

                  const result = await res.json();
                  if (result.id) {
                        setSuccess(true);
                        setAuthor("");
                        setQuoteTitle("");
                        setTranscript("");
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
                              <label htmlFor="author" className="text-lg text-[#55A0AC]">
                                    Author (Source)
                              </label>
                              <input
                                    type="text"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className="w-[400px] p-2 border border-[#80BBBE] rounded-2xl focus:outline-none focus:border-[#55A0AC] mt-2"
                                    required
                              />
                        </div>

                        <div className="flex flex-col">
                              <label htmlFor="quoteTitle" className="text-lg text-[#55A0AC]">
                                    Quotes Title (One sentence summary)
                              </label>
                              <input
                                    type="text"
                                    value={quoteTitle}
                                    onChange={(e) => setQuoteTitle(e.target.value)}
                                    className="w-[400px] p-2 border border-[#80BBBE] rounded-2xl focus:outline-none focus:border-[#55A0AC] mt-2"
                                    required
                              />
                        </div>

                        <div className="flex flex-col">
                              <label htmlFor="transcript" className="text-lg text-[#55A0AC]">
                                    Transcript (Full text)
                              </label>
                              <textarea
                                    value={transcript}
                                    onChange={(e) => setTranscript(e.target.value)}
                                    className="w-[400px] p-2 border border-[#80BBBE] rounded-2xl focus:outline-none focus:border-[#55A0AC] mt-2 h-[150px]"
                                    required
                              ></textarea>
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
