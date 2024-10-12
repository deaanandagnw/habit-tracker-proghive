"use server";

import { prisma } from "@/utils/prisma";


async function editProfile(formData) {
  // Get the session
  const session = await prisma.session.findFirst();

  // Check if the user is authenticated
  if (!session || !session.userId) {
    throw new Error("You must be logged in");
  }

  // const name = formData.get("name");
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const gender = formData.get("gender");
  const country = formData.get("country");

const hashedPassword = await bcrypt.hash(password, 12);

  const updateUser = await prisma.user.update({
    data: {
      username,
      email,
      password: hashedPassword,
      gender,
      country,
    },
  });
  console.log(updateUser);
  //   try {
  //     await prisma.user.update({
  //       data: {
  //         username,
  //         email,
  //         password,
  //         gender,
  //         country,
  //       },
  //     });

  //     revalidatePath("/profile");
  //   } catch (error) {
  //     console.error("Failed to edit profile:", error);
  //     throw new Error("Failed to edit profile. Please try again.");
  //   }
}

export default editProfile;
