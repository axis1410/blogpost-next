import prisma from "@/prisma";
import { connectToDb } from "@/utils/connectToDb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    console.log(req);

    await connectToDb();

    const blog = await prisma.blog.findFirst({
      where: { id },
      include: {
        createdBy: true,
      },
    });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    await connectToDb();

    const blog = await prisma.blog.findFirst({ where: { id } });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const deletedBlog = await prisma.blog.delete({ where: { id } });

    return NextResponse.json({ blog: deletedBlog, message: "Blog deleted" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const { blogTitle, blogContent } = await req.json();

    await connectToDb();
    const blog = await prisma.blog.findFirst({ where: { id } });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const editedBlog = await prisma.blog.update({
      where: { id },
      data: {
        blogTitle,
        blogContent,
      },
    });

    if (!editedBlog) {
      return NextResponse.json({ message: "Failed to edit blog" }, { status: 400 });
    }

    return NextResponse.json({ message: "Edited blog successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
