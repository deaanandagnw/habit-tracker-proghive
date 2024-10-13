import addActivity from "@/actions/activity/addActivity";
import addGoal from "@/actions/goal/addGoal";
import { prisma } from "@/utils/prisma";
import { GoTrash } from "react-icons/go";
import Link from "next/link";

export default async function Page({ userId }) {
  // Fetch goals directly based on userId
  const goals = await prisma.goal.findMany({
    include: { category: true, activities: true },
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Get the most recent goal (if it exists)
  const lastInsertedGoal = goals.length > 0 ? goals[0] : null;

  // Fetch categories for the goal form
  const categories = await prisma.category.findMany();

  // Fetch activities based on the most recent goal if it exists
  const activitiesByLastGoalId = lastInsertedGoal
    ? await prisma.activity.findMany({
        where: {
          goalId: lastInsertedGoal.id,
        },
      })
    : [];

  return (
    <main className="flex w-full gap-x-8">
      <section className="goal-form-input w-1/2">
        {/* <h1 className="text-lg">Add New Goal</h1> */}
        <form action={addGoal} className="flex flex-col gap-3">
          <div>
            <label htmlFor="category" className="text-[#55A0AC] text-sm">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="block text-sm w-full font-medium mt-1 p-3 bg-white border border-[#80BBBE] rounded-lg"
            >
              <option disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-[#55A0AC] text-sm">
              Goal Title
            </label>
            <input
              required
              type="text"
              placeholder="What do You want to achieve?"
              id="title"
              name="title"
              className="p-3 text-sm border border-[#80BBBE] rounded-lg focus:outline-none focus:border-[#55A0AC] mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-[#55A0AC] text-sm">
              Description
            </label>
            <textarea
              required
              id="description"
              name="description"
              placeholder="Describe the goal that you want to achieve!"
              className="p-3 text-sm border border-[#80BBBE] rounded-lg focus:outline-none focus:border-[#55A0AC] mt-1 h-[150px]"
            ></textarea>
          </div>
          <div className="md:flex gap-x-4 w-full">
            <div className="flex flex-col w-full">
              <label htmlFor="startTime" className="text-[#55A0AC] text-sm">
                Start Time
              </label>
              <input
                required
                type="date"
                id="startTime"
                name="startTime"
                className="w-full p-3 text-sm border border-[#80BBBE] rounded-lg focus:outline-none focus:border-[#55A0AC] mt-1"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="endTime" className="text-[#55A0AC] text-sm">
                End Time
              </label>
              <input
                required
                type="date"
                id="endTime"
                name="endTime"
                className="w-full p-3 text-sm border border-[#80BBBE] rounded-lg focus:outline-none focus:border-[#55A0AC] mt-1"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#AADC8D] text-secondary hover:bg-primaryGreenDark text-sm py-3 px-8 font-semibold rounded-full w-full mt-4"
          >
            Submit
          </button>
        </form>
      </section>
      <section className="goal-list w-full mt-[1.7rem] gap-y-3 flex flex-col">
        <article>
          <div>
            {lastInsertedGoal ? (
              <Link href={`/goals/${lastInsertedGoal.id}`}>
                {/* // <Link href={`/dashboard`}> */}
                <div
                  key={lastInsertedGoal.id}
                  className="bg-primary rounded-lg p-6 w-full hover:cursor-pointer"
                >
                  <h2 className="text-lg font-semibold mb-4 w-[80%]">
                    {lastInsertedGoal.title}
                  </h2>
                  <p className="bg-white shadow-sm font-normal text-secondary/70 rounded-lg p-3 my-2">
                    {lastInsertedGoal.description}
                  </p>
                  <div>
                    <div className="flex flex-col md:flex-row md:justify-between mt-4 bg-secondary/10 p-3 rounded-md">
                      <div className="flex items-center mb-2 md:mb-0">
                        <p className=" text-xs font-medium text-secondary">
                          <span className="font-semibold">Start:</span>{" "}
                          {new Date(
                            lastInsertedGoal.startTime
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className=" text-xs font-medium text-secondary">
                          <span className="font-semibold">End:</span>{" "}
                          {new Date(lastInsertedGoal.endTime).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex flex-col items-center justify-center text-secondary bg-white p-6 rounded-lg">
                <div className="text-3xl mb-3 text-[#80BBBE]">🚀</div>
                <h3 className="text-lg font-semibold text-[#55A0AC]">
                  No Goals Yet!
                </h3>
                <p className="text-sm text-secondary/70 mt-2 text-center">
                  Looks like you haven’t added any Goals yet. Try creating one!
                </p>
              </div>
            )}
          </div>
        </article>
        <article>
          <div>
            {lastInsertedGoal && (
              <form action={addActivity}>
                <input
                  required
                  hidden
                  type="text"
                  id="goalId"
                  name="goalId"
                  readOnly
                  value={lastInsertedGoal.id}
                />
                <div className="w-full p-5 mt-3 bg-primaryGreenLight rounded-lg">
                  <div className="flex items-center gap-x-3">
                    <div className="flex flex-col flex-1">
                      <label
                        htmlFor="activity"
                        className="text-green-800 text-sm"
                      >
                        Activity
                      </label>
                      <input
                        required
                        type="text"
                        id="activityTitle"
                        name="title"
                        placeholder="Add activities that could support you to achieve the goal!"
                        className="p-3 py-3 text-sm border border-[#80BBBE] rounded-lg focus:outline-none focus:border-secondary mt-1"
                      />
                    </div>
                    <div className="w-fit self-end pb-0.5">
                      <button
                        type="submit"
                        className="bg-[#AADC8D] hover:bg-primaryGreenDark text-sm text-secondary py-3 px-8 font-semibold rounded-3xl w-fit"
                      >
                        Add Activity
                      </button>
                    </div>
                  </div>
                  <div className="mt-3">
                    {activitiesByLastGoalId.length > 0 ? (
                      activitiesByLastGoalId.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center justify-between bg-[#FFFFFF] rounded-lg p-4 capitalize text-sm my-3"
                        >
                          <div className="">{activity.title}</div>
                          {/* <div className="text-red-700 flex items-center gap-x-2 border hover:bg-red-500 hover:cursor-pointer hover:border-white hover:text-white px-3 py-2 rounded-lg text-xs">
                            <GoTrash className="text-lg" /> Delete
                          </div> */}
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center text-secondary bg-white p-6 rounded-lg mt-3">
                        <div className="text-3xl mb-3 text-[#80BBBE]">🚀</div>
                        <h3 className="text-lg font-semibold text-[#55A0AC]">
                          No Activities Yet!
                        </h3>
                        <p className="text-sm text-secondary/70 mt-2 text-center">
                          Looks like you haven’t added any activities for this
                          goal yet. Kickstart your journey by creating an
                          activity that will help you reach your goal!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>
        </article>
      </section>
    </main>
  );
}
