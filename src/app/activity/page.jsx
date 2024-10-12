import addActivity from "@/actions/activity/addActivity";
import { prisma } from "@/utils/prisma";

export default async function ActivityForm() {
  const userId = await prisma.session.findFirst();

  const goals = await prisma.goal.findMany({
    include: { category: true },
    where: {
      userId: userId.userId,
    },
  });
  return (
    <section className="activity-form-input w-1/2">
      <h1 className="text-lg">Add New Activity</h1>
      <form action={addActivity} className="mt-3 flex flex-col gap-3">
        <div>
          <label htmlFor="goal" className="text-[#55A0AC] text-sm">
            Goal
          </label>
          <select
            id="goal"
            name="goalId"
            className="block text-sm font-medium mt-1 p-3 bg-white border border-[#80BBBE] rounded-lg"
          >
            <option value="" disabled>
              Select a goal
            </option>
            {goals.map((goal) => (
              <option key={goal.id} value={goal.id}>
                {goal.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="title" className="text-[#55A0AC] text-sm">
            Activity Title
          </label>
          <input
            type="text"
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
            className="p-3 text-sm border border-[#80BBBE] rounded-lg focus:outline-none focus:border-[#55A0AC] mt-1 h-[150px]"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-[#AADC8D] text-secondary py-2 px-8 font-semibold rounded-3xl w-fit mt-4"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
