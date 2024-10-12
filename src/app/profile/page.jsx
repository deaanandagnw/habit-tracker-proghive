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
