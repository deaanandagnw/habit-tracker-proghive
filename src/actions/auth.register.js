"use server";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import crypto from "crypto"; // For generating a secure session ID

export async function handleRegister(formData) {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    //   AUTHORIZATION CHEKING!!

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
            gender: "",
            country: "",
            biodata: "",
        },
    });

    redirect("/login");
    // console.log(newUser);
}