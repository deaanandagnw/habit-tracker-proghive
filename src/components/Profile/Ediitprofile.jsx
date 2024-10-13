"use server";

import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { editProfile } from "@/actions/profile/editProfile";
import { redirect } from "next/navigation";

export async function EditProfile() {
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

  const {
    username: userName,
    email,
    age,
    gender,
    country,
    biodata,
  } = isSessionValid.user;

  return (
    <main className="flex justify-center py-10">
      <section className="w-full  rounded-3xl bg-[#DDF0F3] border border-slate-300 shadow-md p-8">
        <form action={editProfile}>
          <div className="space-y-6">
            <h2 className="text-2xl text-indigo-950 font-serif font-semibold mb-6 text-center">
              Edit Your Profile ✨
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-lg text-indigo-950">Full Name</label>
                <input
                  name="username"
                  defaultValue={userName}
                  placeholder="Full Name"
                  className="border border-slate-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-lg text-indigo-950">Email</label>
                <input
                  name="email"
                  value={email}
                  readOnly
                  placeholder="Email"
                  className="border border-slate-300 rounded-lg p-3 w-full bg-gray-100 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-lg text-indigo-950">Gender</label>
                <select
                  name="gender"
                  defaultValue={gender}
                  className="border border-slate-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-lg text-indigo-950">Country</label>
                <input
                  name="country"
                  defaultValue={country}
                  placeholder="Country"
                  className="border border-slate-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-lg text-indigo-950">About Me</label>
                <textarea
                  name="biodata"
                  defaultValue={biodata}
                  placeholder="Tell us something about yourself"
                  className="border border-slate-300 rounded-lg p-3 w-full h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-indigo-600 text-white rounded-lg px-6 py-3 hover:bg-indigo-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
