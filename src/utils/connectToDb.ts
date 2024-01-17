import prisma from "@/prisma";

export async function connectToDb() {
  try {
    await prisma.$connect();
  } catch (error) {
    throw new Error("Error connecting to database");
  }
}
