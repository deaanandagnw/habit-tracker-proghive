import { TotalGoals } from "@/components/Dashboard/TotalGoals";
import { TotalActivity } from "@/components/Dashboard/TotalActivity";
import { TotalCategory } from "@/components/Dashboard/TotalCategory";
import { GoalsByUser } from "@/components/Dashboard/GoalsByUser";

export default function Page() {
  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="flex w-full gap-3 flex-col">
      <p className="text-xl font-bold">Today</p>
      <p className="text-secondary/70 -mt-2">{new Date().toDateString()}</p>
      <div className="flex flex-col mt-1 rounded-lg bg-primary p-7 w-full gap-3">
        <div className="flex flex-row gap-5 justify-between ">
          <TotalGoals />
          <TotalActivity />
          <TotalCategory />
        </div>
        <div className="flex flex-row mt-5">
          <GoalsByUser />
        </div>
      </div>
    </main>
  );
}
