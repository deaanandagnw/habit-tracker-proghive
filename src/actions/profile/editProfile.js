"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function editProfile(formData) {
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

  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const gender = formData.get("gender");
  const country = formData.get("country");
    const biodata = formData.get("biodata");

  console.log(username, email, password, gender, country, biodata);

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.update({
    where: { id: isSessionValid.user.id },
    data: {
      username,
      email,
      password: hashedPassword,
      gender,
      country,
      biodata,
    },
  });
  console.log(user);
}

