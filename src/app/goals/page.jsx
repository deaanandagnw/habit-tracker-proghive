import { AddGoals } from "@/components/Goals/AddGoals/AddGoals";
import { ListGoals } from "@/components/Goals/ListGoals/ListGoals";

export default function GoalsPage() {
    return (
        <main className="p-8 w-full">
            <h2 className="text-dark font-semibold text-3xl">Goals🎯</h2>
            <p className="text-base text-secondary">Goals goals goals!! Lorem ipsum dolor sit goals.</p>
            <hr className="w-full bg-[#55A0AC] h-[2px] my-5" />
            <div className="flex flex-row justify-between items-center gap-8">
                <AddGoals />
                <ListGoals />
            </div>
        </main>
    )
}