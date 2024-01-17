"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [blogContent, setBlogContent] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const getBlogData = async () => {
      await axios.get(`/api/blogs/${params.id}`).then((res) => {
        setBlogContent(res.data.blog.blogContent);
        setBlogTitle(res.data.blog.blogTitle);
      });
    };
    getBlogData();
  }, []);

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit changes called");

    const blog = {
      blogTitle,
      blogContent,
    };

    await axios
      .put(`/api/blogs/${params.id}`, blog)
      .then(() => router.push("/home"))
      .catch((err) => console.log(err));
  };

  const handleDelete = async () => {
    await axios
      .delete(`/api/blogs/${params.id}`)
      .then(() => router.push("/home"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col space-y-2">
        <form onSubmit={handleEdit} className="flex flex-col space-y-2">
          <h1>Edit Blog</h1>
          <input
            className="p-2 text-black"
            type="text"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
          />
          <textarea
            className="p-2 text-black h-56 w-80"
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
          />
          <button className="border-white border-[1px] p-2 hover:bg-slate-950 transition duration-100">
            Submit changes
          </button>
        </form>
        <button
          onClick={handleDelete}
          className="bg-rose-600 p-2 hover:bg-rose-500 transition duration-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
