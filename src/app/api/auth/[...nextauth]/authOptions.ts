import prisma from "@/prisma";
import { connectToDb } from "@/utils/connectToDb";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        // email: { label: "Email", type: "text", placeholder: "Enter email" },
        // password: { label: "Password", type: "text", placeholder: "Enter password" },
      },
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

          if (!user) throw new Error("User not found");

          const isPasswordCorrect = await bcrypt.compare(password, user?.password!);

          if (!isPasswordCorrect) throw new Error("Invalid Password");

          return user;
        } catch (error) {
          console.log("Sign In error: ", error);
          throw new Error(`${error}`);
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user?.id,
        };
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};
