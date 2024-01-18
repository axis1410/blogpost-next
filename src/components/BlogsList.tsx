"use client";

import { useEffect, useState } from "react";
import BlogItem from "./BlogItem";

const BlogsList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getBlogs = async () => {
      setIsLoading(true);
      console.log("isLoading: ", isLoading);
      const res = await fetch("/api/blogs");
      const blogData = await res.json();

      console.log(blogData);

      setBlogs(blogData.blogs);
      setIsLoading(false);
      console.log("isLoading: ", isLoading);
    };

    getBlogs();
  }, []);

  return (
    <div>
      BlogsList
      <ul>
        <BlogItem blogs={blogs} />
      </ul>
    </div>
  );
};

export default BlogsList;
