import prisma from "@/prisma";
import { connectToDb } from "@/utils/connectToDb";
import { NextResponse } from "next/server";

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
