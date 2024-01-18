import prisma from "@/prisma";
import { connectToDb } from "@/utils/connectToDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log(request);
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await connectToDb();

    const existingUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "Invalid user" }, { status: 401 });
    }

    const userBlogs = await prisma.blog.findMany({
      where: {
        createdBy: {
          id: existingUser.id,
        },
      },
    });

    return NextResponse.json({ blogs: userBlogs, success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Couldn't fetch user data" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
