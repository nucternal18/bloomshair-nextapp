import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma-db";

// const prisma = new PrismaClient();

export async function GET(req: Request) {
  const pictures = await prisma.picture.findMany({});
  await prisma.$disconnect();
  if (pictures) {
    return NextResponse.json(pictures);
  } else {
    return new Response("No images found", {
      status: 400,
    });
  }
}
