import { TotalGoals } from "@/components/Dashboard/TotalGoals";
import { TotalActivity } from "@/components/Dashboard/TotalActivity";
import { TotalCategory } from "@/components/Dashboard/TotalCategory";
import { GoalsByUser } from "@/components/Dashboard/GoalsByUser";

export default function Page() {
  
  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main className="flex w-full gap-3 flex-col">
        <h1 className="text-xl mb-2">Today</h1>
        <p className="text-sm">{today}</p>
        <div className="flex flex-col mt-5 bg-primary p-5 w-full gap-3">
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
