import BlogsList from "@/components/BlogsList";
import LogoutButton from "@/components/LogoutButton";
import axios from "axios";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div>
      HomePage
      <br />
      {JSON.stringify(session)}
      <br />
      <BlogsList />
      <br />
      <LogoutButton />
      <Link href="/api/auth/signin">Sign in</Link>
    </div>
  );
}
