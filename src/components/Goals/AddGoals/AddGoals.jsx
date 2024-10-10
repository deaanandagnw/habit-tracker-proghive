export function AddGoals() {
      return (
            <div className="flex flex-col">
                  <h5 className="font-semibold text-2xl text-dark">Add New Goal</h5>
                  <form className="mt-3 flex flex-col gap-3">
                        <div className="flex flex-col">
                              <label htmlFor="author" className="text-lg text-[#55A0AC]">
                                    Author (Source)
                              </label>
                              <input
                                    type="text"
                                    className="w-[400px] p-2 border border-[#80BBBE] rounded-2xl focus:outline-none focus:border-[#55A0AC] mt-2"
                              />
                        </div>

                        <div className="flex flex-col">
                              <label htmlFor="quoteTitle" className="text-lg text-[#55A0AC]">
                                    Quotes Title (One sentence summary)
                              </label>
                              <input
                                    type="text"
                                    className="w-[400px] p-2 border border-[#80BBBE] rounded-2xl focus:outline-none focus:border-[#55A0AC] mt-2"
                              />
                        </div>

                        <div className="flex flex-col">
                              <label htmlFor="transcript" className="text-lg text-[#55A0AC]">
                                    Transcript (Full text)
                              </label>
                              <textarea
                                    className="w-[400px] p-2 border border-[#80BBBE] rounded-2xl focus:outline-none focus:border-[#55A0AC] mt-2 h-[150px]"
                              ></textarea>
                        </div>

                        <button
                              type="submit"
                              className="bg-[#AADC8D] text-secondary py-4 px-8 font-semibold rounded-3xl w-fit mt-4"
                        >
                              Submit
                        </button>
                  </form>
            </div>
      );
}
