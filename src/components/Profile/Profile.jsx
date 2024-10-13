"use server"

import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";

export async function Profile() {
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

  // Safely access user's profile
  const userName = isSessionValid.user.username || "User";
  const email = isSessionValid.user.email || "";
  const age = isSessionValid.user.age || "";
  const gender = isSessionValid.user.gender || "";
  const country = isSessionValid.user.country || "";
    const biodata = isSessionValid.user.biodata || "";

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
      <div className="border-slate-500 w-[25rem] rounded-3xl px-8 py-5 bg-[#DDF0F3] flex items-center gap-6">
        <div className="p-3 border-slate items-center w-auto">
          <img
            src="https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"
            alt="profile"
            width="120px"
            height="120px"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col w-auto items-start gap-4 text-indigo-950 font-serif">
          <div>
            <h1 className="font-serif text-2xl font-bold">{userName}</h1>
            <h2 className="text-lg">📍{country}</h2>
          </div>

          <ul className="text-base space-y-1">
            <li>⌛{age}</li>
            <li>✉️ {email}</li>
            <li>👤 {gender}</li>
          </ul>
        </div>
      </div>
      <div className="row-span-1 py-6 w-full mt-4 border-slate-500 rounded-xl bg-[#DDF0F3]">
        <div className="text-center m-6 text-lg font-sans text-indigo-950">
          <p>{biodata}</p>
        </div>
      </div>
    </main>
  );
}
