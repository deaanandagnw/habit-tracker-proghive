//"use server";

import { prisma } from "@/utils/prisma";
import { EditProfile } from "@/components/Profile/Ediitprofile";
import { Profile } from "@/components/Profile/Profile";
// import editProfile from "@/actions/profile/editProfile";

export default function profilePage() {
  return (
    <main className="flex gap-7">
      <section className="min-h-full col-span-2 bg-white">
        <Profile />
      </section>
      <section className="flex justify-center items-center bg-white ">
        <EditProfile />
      </section>
    </main>
  );
}
