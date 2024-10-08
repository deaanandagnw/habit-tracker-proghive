import { headers } from "next/headers";
import { prisma } from "@/utils/prisma";
// import jwt from "jsonwebtoken";

export async function GET() {
  const headerList = headers();
  const authorization = headerList.get("authorization");
  const sessionId = authorization.split(" ")[1];
  // console.log(sessionId);

  // check session Id => SESSION BASE
  const isSessionValid = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
  });

  if (!isSessionValid) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  return Response.json({ message: "It's protected data" });
}
