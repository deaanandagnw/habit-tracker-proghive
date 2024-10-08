import { cookies } from "next/headers";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  // Check if sessionId exists in the cookie
  if (!sessionId) {
    return redirect("/login");
  }

  // Query the session from the database
  const isSessionValid = await prisma.session.findFirst({
    where: { id: sessionId },
    include: { user: true },
  });

  // Redirect if the session is not valid or user data is missing
  if (!isSessionValid || !isSessionValid.user) {
    return redirect("/login");
  }

  // Safely access user's name and generate an avatar
  const userName = isSessionValid.user.username || "User";
  const initialAvatar = userName.charAt(0);

  async function logout() {
    "use server";

    // Delete the session from the database
    await prisma.session.delete({
      where: { id: sessionId },
    });

    // Delete session cookie
    cookies().delete("sessionId");

    // Redirect to the homepage
    redirect("/");
  }

  return (
    <main>
      <header className="bg-indigo-500 text-white font-medium p-4 flex justify-between items-center">
        <div className="font-bold text-lg">Habit Tracker</div>
        <div className="flex items-center space-x-4">
          <form action={logout}>
            <button className="bg-white hover:bg-white/80 text-black">Logout</button>
          </form>
          <div>{userName}</div>
          <div className="w-8 h-8 rounded-full bg-white text-indigo-600 font-bold flex justify-center items-center">{initialAvatar}</div>
        </div>
      </header>
      <div className="max-w-6xl m-auto py-12">{children}</div>
    </main>
  );
}
