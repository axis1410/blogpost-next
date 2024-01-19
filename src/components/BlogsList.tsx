"use client";

import getAllBlogs from "@/utils/getAllBlogs";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import BlogItem from "./BlogItem";

const BlogsList = () => {
  const session = useSession();
  const user = session.data?.user;
  const { data, error, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
    refetchOnWindowFocus: "always",
    refetchOnMount: "always",
    refetchInterval: 60000,
  });

  return (
    <div>
      {isLoading && <h1>Loading blogs</h1>}
      {error && <h1>{error.message}</h1>}
      {data && (
        <ul>
          <h1 className="p-3 text-4xl font-bold">Hello {user!.name}</h1>
          <BlogItem blogs={data} />
        </ul>
      )}
    </div>
  );
};

export default BlogsList;
