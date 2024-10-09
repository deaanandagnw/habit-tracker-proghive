import Link from "next/link";

export default function Home() {
  return (
    <section>
      <header className="w-full flex justify-between items-center p-4">
        <h1 className="text-lg font-semibold">Habit Tracker</h1>
        <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Go to the App
        </a>
      </header>
      <main className="text-center mt-20">
        <h2 className="text-4xl font-bold mb-4">Take Control of Your Daily Habits</h2>
        <p className="text-gray-700 mb-8 max-w-xl mx-auto">
          Stay on track and achieve your goals with Habit Tracker! Whether you're building new habits or improving your daily routine, our app helps you plan, track, and analyze your progress. Set your personal goals, get reminders, and
          receive tailored tips to improve consistency. Start your journey towards better time management and productivity today!
        </p>
        <Link href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-md">
          Get Started
        </Link>
      </main>
    </section>
  );
}
