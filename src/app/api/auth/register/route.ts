import prisma from "@/prisma";
import { connectToDb } from "@/utils/connectToDb";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, username } = await req.json();

    if (!name || !password || !email || !username) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    await connectToDb();

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
    }

    const user = {
      name,
      email,
      username,
    };

    return NextResponse.json({ message: "Registration successful", user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
