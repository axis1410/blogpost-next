"use client";

import getAllBlogs from "@/utils/getAllBlogs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import BlogItem from "./BlogItem";

const BlogsList = () => {
  // const [blogs, setBlogs] = useState<Blog[]>([]);

  // useEffect(() => {
  //   const getBlogs = async () => {
  //     const blogData = await getAllBlogs();

  //     setBlogs(blogData);
  //   };

  //   getBlogs();
  // }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });

  // console.log(data[0]);

  return (
    <div>
      BlogsList
      {isLoading && <h1>Loading blogs</h1>}
      {error && <h1>{error.message}</h1>}
      {data && <h1>{data[0].blogTitle}</h1>}
      <ul>{/* <BlogItem blogs={blogs} /> */}</ul>
    </div>
  );
};

export default BlogsList;
