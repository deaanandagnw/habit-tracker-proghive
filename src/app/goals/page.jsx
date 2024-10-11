import addGoal from "@/actions/goal/addGoal";
import { prisma } from "@/utils/prisma";

export default async function Page() {
  const userId = await prisma.session.findFirst();

  const goals = await prisma.goal.findMany({
    include: { category: true },
    where: {
      userId: userId.userId,
    },
  });

  const categories = await prisma.category.findMany();

  return (
    <main className="flex w-full gap-x-8">
      <section className="goal-form-input w-1/2">
        <h1 className="text-lg">Add New Goal</h1>
        <form action={addGoal} className="mt-3 flex flex-col gap-3">
          <input
            type="text"
            id="title"
            hidden
            name="userId"
            className="p-3 text-sm border border-[#80BBBE] rounded-lg focus:outline-none focus:border-[#55A0AC] mt-1"
          />
          <div>
            <label htmlFor="category" className="text-[#55A0AC] text-sm">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="block text-sm font-medium mt-1 p-3 bg-white border border-[#80BBBE] rounded-lg"
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
          <div className="md:flex gap-x-4 l">
            <div className="flex flex-col w-1/2">
              <label htmlFor="startTime" className="text-[#55A0AC] text-sm">
                Start Time
              </label>
              <input
                type="datetime-local"
                id="startTime"
                name="startTime"
                className="w-fit p-3 text-sm border border-[#80BBBE] rounded-lg focus:outline-none focus:border-[#55A0AC] mt-1"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="endTime" className="text-[#55A0AC] text-sm">
                End Time
              </label>
              <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                className="w-fit p-3 text-sm border border-[#80BBBE] rounded-lg focus:outline-none focus:border-[#55A0AC] mt-1"
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
      <section className="goal-list w-full">
        <h1 className="text-lg mb-3">My goals</h1>
        <div className="mt-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="bg-primary rounded-lg p-6 mb-4 hover:cursor-pointer hover:bg-secondary/20"
            >
              <p className="text-xs rounded-md bg-white px-3 py-1 w-fit text-secondary/70 mb-1">
                {goal.userId}
              </p>
              <p className="text-xs rounded-md bg-white px-3 py-1 w-fit text-secondary/70 mb-1">
                {goal.category.name}
              </p>
              <h2 className="text-base">{goal.title}</h2>
              <p className="text-sm font-normal text-secondary/70 mb-1">
                {goal.description}
              </p>
              <p className="text-sm font-normal text-secondary/70">
                Start: {new Date(goal.startTime).toLocaleString()} | End:{" "}
                {new Date(goal.endTime).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
