import { cookies } from "next/headers";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    return redirect("/login");
  }

  const isSessionValid = await prisma.session.findFirst({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!isSessionValid || !isSessionValid.user) {
    return redirect("/login");
  }

  const userName = isSessionValid.user.username || "User";
  const initialAvatar = userName.charAt(0);

  async function logout() {
    "use server";
    await prisma.session.delete({
      where: { id: sessionId },
    });
    cookies().delete("sessionId");
    redirect("/");
  }

  return (
    <main className="">
      <header className="text-black font-medium py-5 flex justify-between items-center border border-b border-primary border-l-0 border-r-0 border-t-0 mx-12 mt-6">
        <div className="">
          <div className="font-bold text-3xl ">My Profile 👤</div>
          <p className="font-light text-sm mt-2">Update your newest profile.</p>
        </div>
        <div className="flex items-center space-x-5">
          <div className="flex gap-x-2 items-center">
            <div className="w-8 h-8 rounded-full bg-[#AADC8D] text-black font-bold flex justify-center items-center">
              {initialAvatar}
            </div>
            <div>{userName}</div>
          </div>
          <form action={logout}>
            <button className="bg-red-500 text-white hover:bg-red-400 rounded-lg px-3 py-1">
              Logout
            </button>
          </form>
        </div>
      </header>
      <div className="text-black font-medium py-1 flex justify-between items-center mx-12 mt-3 mb-5">
        {children}
      </div>
    </main>
  );
}
