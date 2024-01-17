"use client";

import { useEffect, useState } from "react";
import BlogItem from "./BlogItem";



const BlogsList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const getBlogs = async () => {
      const res = await fetch("/api/blogs");

      const blogData = await res.json();
      console.log(blogData.blogs);

      setBlogs(blogData.blogs);
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
