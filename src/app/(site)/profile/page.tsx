"use client";

import { BlogContext } from "@/Providers/context/BlogContext";
import getAllBlogs from "@/utils/getAllBlogs";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

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

  const { blogData, setBlogData } = useContext(BlogContext);

  useEffect(() => {
    if (blogData) {
      const blogsByUser = filterArrayByUserId(blogData, userId);
      setUserBlogs(blogsByUser);
    } else if (data) {
      const blogsByUser = filterArrayByUserId(data, userId);
      setBlogData(data);
      setUserBlogs(blogsByUser);
    }
  }, [blogData, data, userId]);

  return (
    <div>
      Profile Page
      {userId && <h4>Logged in as {session?.data?.user?.name}</h4>}
      {userBlogs && (
        <>
          {userBlogs.map((blog: Blog) => (
            <Link key={blog.id} href={`/blog/${blog.id}`}>
              <h1>{blog.blogTitle}</h1>
              <p>{blog.blogContent}</p>
              <hr />
            </Link>
          ))}
        </>
      )}
      <Link href={"/"}>Go to homepage</Link>
    </div>
  );
}

function filterArrayByUserId(blogs: Blog[], userId: string) {
  return blogs.filter((blog) => blog.createdBy.id === userId);
}
