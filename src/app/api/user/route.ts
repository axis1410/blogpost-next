import prisma from "@/prisma";
import { connectToDb } from "@/utils/connectToDb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET(req: NextRequest) {
  const session = getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ status: "fail", message: "You are not logged in" }, { status: 401 });
  }

  const { user } = session;
}
