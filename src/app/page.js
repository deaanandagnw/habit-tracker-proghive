import Link from "next/link";

export default function Home() {
  return (
    <section>
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Habit Tracker</h1>
          <Link href="/login">
            <button className="bg-[#AADC8D] text-black px-4 py-2 rounded-md font-bold rounded-lg hover:bg-green-500 transition duration-300">
              Go to App
            </button>
          </Link>
        </div>
      </header>

      <main className="text-center mt-20">
        <h2 className="text-4xl font-bold mb-4">
          Take Control of Your Daily Habits
        </h2>
        <p className="text-gray-700 mb-8 max-w-xl mx-auto">
          Stay on track and achieve your goals with Habit Tracker! Whether
          you're building new habits or improving your daily routine, our app
          helps you plan, track, and analyze your progress. Set your personal
          goals, get reminders, and receive tailored tips to improve
          consistency. Start your journey towards better time management and
          productivity today!
        </p>

        <Link
          href="/login"
          className="bg-[#AADC8D] text-black px-4 py-2 rounded-md font-bold rounded-lg hover:bg-green-500 transition duration-300"
        >
          Get Started
        </Link>
      </main>
    </section>
  );
}
