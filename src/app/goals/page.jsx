import addActivity from "@/actions/activity/addActivity";
import deleteActivity from "@/actions/activity/deleteActivity";
import addGoal from "@/actions/goal/addGoal";
import { prisma } from "@/utils/prisma";
import { GoTrash } from "react-icons/go";
import DeleteButton from "../goals/components/DeleteButton";

export default async function Page() {
  const userId = await prisma.session.findFirst();

  const goals = await prisma.goal.findMany({
    include: { category: true },
    where: {
      userId: userId.userId,
    },
  });

  const lastInsertedGoal = goals[goals.length - 1];

  const categories = await prisma.category.findMany();

  const activitiesByGoalsId = await prisma.activity.findMany({
    where: {
      goalId: goals.id,
    },
  });

  return (
    <main className="flex w-full gap-x-8">
      <section className="goal-form-input w-1/2">
        <h1 className="text-lg">Add New Goal</h1>
        <form action={addGoal} className="mt-3 flex flex-col gap-3">
          <div className="">
            <label htmlFor="category" className="text-[#55A0AC] text-sm">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="block text-sm w-full font-medium mt-1 p-3 bg-white border border-[#80BBBE] rounded-lg"
            >
              <option value="" disabled>
                Select a category
              </option>
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
                type="date"
                id="endTime"
                name="endTime"
                className="w-full p-3 text-sm border border-[#80BBBE] rounded-lg focus:outline-none focus:border-[#55A0AC] mt-1"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#AADC8D] text-secondary py-2 px-8 font-semibold rounded-3xl w-fit mt-4"
          >
            Submit
          </button>
        </form>
      </section>
      <section className="goal-list w-full gap-y-3 flex flex-col">
        <article>
          <div className="">
            <div
              key={lastInsertedGoal.id}
              className="bg-primary rounded-lg p-6 mb-4 hover:cursor-pointer hover:bg-secondary/20"
            >
              <h2 className="text-lg">{lastInsertedGoal.title}</h2>
              <p className="text-sm font-normal text-secondary/70 mb-1">
                {lastInsertedGoal.description}
              </p>
              <p className="text-sm font-normal text-secondary/70">
                Start: {new Date(lastInsertedGoal.startTime).toLocaleString()} |
                End: {new Date(lastInsertedGoal.endTime).toLocaleString()}
              </p>
            </div>
          </div>
        </article>
        <article>
          <div>
            {/* <p className="text-lg mb-3">Activity</p> */}
            <form action={addActivity}>
              <input
                hidden
                type="text"
                id="goalId"
                name="goalId"
                placeholder="Add activities that could support you to achieve the goal!"
                className="p-3 py-3 text-sm border border-[#80BBBE] rounded-lg focus:outline-none focus:border-secondary mt-1"
              />
              <div className="w-full p-5 -mt-3 bg-primaryGreenLight rounded-lg">
                <div className="flex items-center gap-x-3">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="title" className="text-green-800 text-sm">
                      Activity Title
                    </label>
                    <input
                      type="text"
                      id="title"
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
                  {activitiesByGoalsId.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between bg-[#FFFFFF] rounded-lg p-4 capitalize text-sm my-3"
                    >
                      <div className="">{activity.title}</div>

                      {/* <DeleteButton /> */}
                      {/* <DeleteButton activityId={activity.id} /> */}
                      <div className="text-red-700 flex items-center gap-x-2 border hover:bg-red-500 hover:cursor-pointer hover:border-white hover:text-white px-3 py-2 rounded-lg text-xs">
                        <GoTrash className="text-lg" /> Delete
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </article>
      </section>
    </main>
  );
}
