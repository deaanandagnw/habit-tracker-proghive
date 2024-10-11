import { AddGoals } from "@/components/Goals/AddGoals/AddGoals";
import { ListGoals } from "@/components/Goals/ListGoals/ListGoals";

export default function GoalsPage() {
    return (
        <main className="p-8 w-full">
            <h2 className="text-dark font-semibold text-3xl">Goals🎯</h2>
            <p className="text-base text-secondary mt-2">Set your personal goals and track your progress towards achieving them. Add your goals, break them into actionable steps, and stay consistent with Habit Tracker's guidance.</p>
            <hr className="w-full bg-[#55A0AC] h-[2px] my-5" />
            <div className="flex flex-row justify-between items-center gap-8">
                <AddGoals />
                <ListGoals />
            </div>
        </main>
    )
}