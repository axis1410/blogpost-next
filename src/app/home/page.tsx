"use client";

import BlogsList from "@/components/BlogsList";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data, status } = useSession();

  const router = useRouter();

  return (
    <div>
      Home
      <br />
      {status === "authenticated" && <button onClick={() => signOut()}>Logout</button>}
      {status === "unauthenticated" && (
        <button onClick={() => router.push("/auth/login")}>Go to Login</button>
      )}
      <p>Logged in as {data?.user?.name}</p>
      <BlogsList />
    </div>
  );
}
