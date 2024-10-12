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
      <header className=" text-black font-medium p-5 flex justify-between items-center shadow">
        <div>
        <div className="font-bold text-2xl ml-5">Dahboard</div>
        <p className="font-light text-[0.8rem] ml-5">Summary of my progress in one page</p>
        </div>

        <div className="flex items-center space-x-4">
          <form action={logout}>
            <button className="bg-rose-300 hover:bg-red/80 text-black">Logout</button>
          </form>
          <div>{userName}</div>
          <div className="w-8 h-8 rounded-full bg-[#AADC8D] text-black font-bold flex justify-center items-center">{initialAvatar}</div>
        </div>
      </header>
      <div className="max-w-6xl m-auto py-12 ml-9">{children}</div>
    </main>
  );
}
