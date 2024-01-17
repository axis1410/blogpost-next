import prisma from "@/prisma";
import { connectToDb } from "@/utils/connectToDb";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // providers: [
  //   CredentialsProvider({
  //     name: "credentials",

  //     credentials: {
  //       email: { label: "Email", type: "email", placeholder: "Enter email" },
  //       password: { label: "Password", type: "password", placeholder: "Enter password" },
  //     },
  //     async authorize(credentials, _) {
  //       if (!credentials || !credentials.email || !credentials.password) return null;
  //       await connectToDb();
  //       try {
  //         const user = await prisma.user.findFirst({
  //           where: { email: credentials.email },
  //         });
  //         if (!user) return null;
  //         if (!user?.password) return null;
  //         const isPasswordCorrect = await bcrypt.compare(credentials.password, user?.password);
  //         if (isPasswordCorrect) return user;
  //         return null;
  //       } catch (error) {
  //         console.log(error);
  //         return null;
  //       } finally {
  //         await prisma.$disconnect();
  //       }
  //     },
  //   }),
  // ],
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          await connectToDb();

          const user = await prisma.user.findFirst({
            where: {
              email,
            },
          });

          if (!user) return null;

          const isPasswordCorrect = await bcrypt.compare(password, user?.password!);

          if (!isPasswordCorrect) return null;

          return user;
        } catch (error) {
          console.log("Sign In error: ", error);
        } finally {
          await prisma.$disconnect();
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
