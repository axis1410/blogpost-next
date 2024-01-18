import BlogsList from "@/components/BlogsList";
import LogoutButton from "@/components/LogoutButton";
import getAllBlogs from "@/utils/getAllBlogs";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "../(api)/api/auth/[...nextauth]/authOptions";

export default async function HomePage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });

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
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BlogsList />
      </HydrationBoundary>
      <br />
      <Link href="/profile">View profile</Link>
      <br />
      <Link href="/create-blog">Create blog</Link>
      <br />
      <LogoutButton />
      <Link href="/api/auth/signin">Sign in</Link>
    </div>
  );
}
