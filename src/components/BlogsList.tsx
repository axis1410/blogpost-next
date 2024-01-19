"use client";

import getAllBlogs from "@/utils/getAllBlogs";
import { useQuery } from "@tanstack/react-query";
import BlogItem from "./BlogItem";

const BlogsList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
    refetchOnWindowFocus: "always",
    refetchOnMount: "always",
    refetchInterval: 60000,
  });

  return (
    <div>
      BlogsList
      {isLoading && <h1>Loading blogs</h1>}
      {error && <h1>{error.message}</h1>}
      {data && (
        <ul>
          <BlogItem blogs={data} />
        </ul>
      )}
    </div>
  );
};

export default BlogsList;
