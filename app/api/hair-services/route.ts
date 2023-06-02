/* eslint-disable import/no-anonymous-default-export */
import { NextResponse } from "next/server";
import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ServiceDataProps = {
  id: string;
  name: string;
  price: number;
  category: string;
  user?: {
    id: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

type QueryObjProps = {
  [k: string]: string;
};

export async function GET(req: Request) {
  /**
   * @desc GET all services.
   * @route GET /api/hair-services
   * @access Public
   */
  const { searchParams } = new URL(req.url);

  const queryItems: QueryObjProps = Object.fromEntries(searchParams.entries());
  const { sortBy, category } = queryItems;

  let result: ServiceDataProps[];

  // Chain sort conditions
  if (sortBy === "latest" || category) {
    result = await prisma.service.findMany({
      where: { category: category as Category },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else if (sortBy === "oldest" || category) {
    result = await prisma.service.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  } else {
    result = await prisma.service.findMany({});
  }

  return NextResponse.json(result);
}
