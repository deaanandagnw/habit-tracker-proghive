import { prisma } from "@/utils/prisma";
import { editProfile } from "@/actions/profile/editProfile";

export function EditProfile() {
  return (
    <main>
      <section>
        <form action={editProfile}>
          <div className="h-[100%] m-auto flex-1 pt-15 border-slate-500 rounded-3xl p-8 bg-[#DDF0F3]">
            <div className="max-w-[600px] space-y-4 mx-auto">
              <div className="flex flex-row items-center pb-5">
                <label className="text-indigo-950 text-2xl font-semibold">
                  Edit Your Profile ✨
                </label>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-1 w-full md:w-1/2">
                  <label className="text-base">Full Name</label>
                  <input
                    name="username"
                    placeholder="Full Name"
                    className="border border-blue-200 rounded-xl p-2 w-full"
                  />
                </div>
                {/* <div className="flex flex-col gap-1 w-full md:w-1/2">
                <label className="text-base">Last Name</label>
                <input className="border border-slate-200 rounded-xl p-2 w-full" />
              </div> */}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-base">Email</label>
                <input
                  name="email"
                  placeholder="Email"
                  className="border border-slate-200 rounded-xl p-2 w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-base">Password</label>
                <input
                  name="password"
                  placeholder="Password"
                  className="border border-slate-200 rounded-xl p-2 w-full"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1 w-full md:w-1/2">
                  <label className="text-base">Gender</label>
                  <select
                    name="gender"
                    placeholder="Gender"
                    className="border border-slate-200 rounded-xl p-2 w-full"
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                {/* <div className="flex flex-col gap-1 w-full md:w-1/2">
                  <label className="text-base">Birth Date</label>
                  <input
                    className="border border-slate-200 rounded-xl p-2 w-full"
                    type="date"
                  />
                </div> */}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-base">Country</label>
                <input
                  name="country"
                  placeholder="Country"
                  className="border border-slate-200 rounded-xl p-2 w-full"
                />
                {/* <select className="border border-slate-200 rounded-xl p-2 w-full">
                  <option>Indonesia</option>
                  <option>Singapore</option>
                  <option>Malaysia</option>
                  <option>Brunei</option>
                </select> */}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-base">About Me</label>
                <textarea
                  name="biodata"
                  className="border border-slate-200 rounded-xl p-2 w-full"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="border border-slate-200 rounded-xl p-3 hover:bg-green-400 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
