//"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";
import Image from "next/image";
import { Input } from "postcss";
import { EditProfile } from "@/components/Profile/Ediitprofile";
import { Profile } from "@/components/Profile/Profile";

async function editData(formData) {
  const firstname = formData.get("firstname");
  const secondName = formData.get("secondName");
  const email = formData.get("email");
  const password = formData.get("password");
  const gender = formData.get("gender");
  const age = formData.get("age");
  const country = formData.get("country");
  const aboutMe = formData.get("aboutme");
}

export default function profilePage() {
  // const name = formData.get("name");
  // const password = formData.get("password");
  // const email = formData.get("email");

  return (
    <main className="h-screen w-full grid grid-cols-5  bg-[#DDF0F3] ">
      <section className=" w-full min-h-full col-span-2 bg-white  pt-10 pb-20 grid grid-rows-2 ">
        <Profile />
      </section>
      <section className="col-span-3 flex justify-center items-center bg-white pt-20 pb-20">
        <EditProfile />
      </section>
    </main>
  );
}
