import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
    const { username, email, password } = await req.json();

    // validation -> emailnya sudah terdaftar apa belum?
    // passwordnya sudah 8 digit?

    // create hash password
    console.time("Hash");
    const hashedPassword = await bcrypt.hash(password, 12); //akan menghasilkan random string
    console.timeEnd("Hash");
    // owasp -> 10-13, no headvy load, no much time

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

    return Response.json({ data: newUser }, { status: 201 });
}