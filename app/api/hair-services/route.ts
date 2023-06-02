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
  const services = await prisma.service.findMany({});
  if (!services) {
    return new Response("No services found", {
      status: 400,
    });
  }

  return NextResponse.json(services);
}
