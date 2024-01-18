import prisma from "@/prisma";
import { connectToDb } from "@/utils/connectToDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { blogTitle, blogContent, userId } = await request.json();

    if (!blogTitle || !blogContent || !userId) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    await connectToDb();

    const existingUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "Invalid User" }, { status: 401 });
    }

    const newBlog = await prisma.blog.create({
      data: {
        blogContent,
        blogTitle,
        userId: existingUser.id,
      },
      include: {
        createdBy: true,
      },
    });

    return NextResponse.json({ message: "Blog created", blog: newBlog }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    await connectToDb();

    const blogs = await prisma.blog.findMany({
      include: {
        createdBy: true,
      },
    });

    if (!blogs) {
      return NextResponse.json({ message: "Error fetching blogs" }, { status: 400 });
    }

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
