import prisma from "@/prisma";
import { connectToDb } from "@/utils/connectToDb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET() {
  try {
    await connectToDb();

    const users = await prisma.user.findMany({
      include: {
        blogs: true,
        _count: true,
      },
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
