"use client";

import BlogItem from "@/components/BlogItem";
import getAllBlogs from "@/utils/getAllBlogs";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const session = useSession();

  // @ts-ignore
  const userId = session?.data?.user?.id;

  const [userBlogs, setUserBlogs] = useState<Blog[] | undefined>([]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getAllBlogs(),
    refetchOnWindowFocus: "always",
    refetchOnMount: "always",
    refetchInterval: 30000,
  });

  useEffect(() => {
    if (data) {
      const blogsByUser = filterArrayByUserId(data, userId);
      setUserBlogs(blogsByUser);
    }
  }, [data, userId]);

  if (!session?.data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="mt-[78px]">
      <h1 className="p-3 text-3xl">Your Blogs</h1>
      {userId && <h4 className="p-3 text-xl">{session?.data?.user?.name}</h4>}
      {userBlogs ? (
        <>
          {/* {userBlogs.map((blog: Blog) => (
            <Link key={blog.id} href={`/blog/${blog.id}`}>
              <h1>{blog.blogTitle}</h1>
              <p>{blog.blogContent}</p>
              <hr />
            </Link>
          ))} */}
          <BlogItem blogs={userBlogs} showCreatedBy={false} isLink={true} />
        </>
      ) : (
        <>No blogs yet</>
      )}
      <Link className="p-3 mt-3" href={"/"}>
        <span className="text-white p-2 rounded-md bg-black hover:bg-zinc-900">Go to homepage</span>
      </Link>
    </div>
  );
}

function filterArrayByUserId(blogs: Blog[], userId: string) {
  return blogs.filter((blog) => blog.createdBy.id === userId);
}
