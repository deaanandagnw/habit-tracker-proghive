"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function editProfile(formData) {
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

  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const gender = formData.get("gender");
  const country = formData.get("country");
  const biodata = formData.get("biodata");

  console.log(username, email, password, gender, country, biodata);

  const updateData = {
    username,
    email,
    gender,
    country,
    biodata,
  };

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    updateData.password = hashedPassword;
  }

  const user = await prisma.user.update({
    where: { id: isSessionValid.user.id },
    data: updateData,
  });

  revalidatePath("/activities"); // Update the path if needed

  console.log(user);
  return { success: true };
}
