"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { data, status } = useSession();

  const router = useRouter();

  const [blogs, setBlogs] = useState<Blog[]>([]);

  // useEffect(() => {
  //   const getBlogs = async () => {
  //     const res = await fetch("/api/blogs");

  //     const blogData = await res.json();
  //     console.log(blogData.blogs);

  //     setBlogs(blogData.blogs);
  //   };

  //   getBlogs();
  // }, []);

  return (
    <div>
      Home
      <br />
      {status === "authenticated" && <button onClick={() => signOut()}>Logout</button>}
      {status === "unauthenticated" && (
        <button onClick={() => router.push("/auth/login")}>Go to Login</button>
      )}
      <h1>{JSON.stringify(data)}</h1>
      {/* {JSON.stringify(blogs)}
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.blogTItle}</h2>
          <p>{blog.blogContent}</p>
        </div>
      ))} */}
    </div>
  );
}
