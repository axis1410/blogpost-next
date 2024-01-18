"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const session = useSession();

  const { data, error, isLoading } = useQuery({
    queryKey: ["blogsById"],
    queryFn: () => getBlogById(params.id),
    refetchOnWindowFocus: "always",
    refetchInterval: 30000,
  });

  const [blogData, setBlogData] = useState({
    blogTitle: "",
    blogContent: "",
  });

  useEffect(() => {
    if (data) {
      setBlogData({
        blogTitle: data.blogTitle,
        blogContent: data.blogContent,
      });
    }
  }, [isLoading, data]);

  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/blogs/${params.id}`, {
        blogTitle: blogData.blogTitle,
        blogContent: blogData.blogContent,
        // @ts-ignore
        userId: session?.data?.user?.id,
      });

      console.log(res);
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete the blog?");

    if (confirmDelete) {
      try {
        const res = await axios.delete(`/api/blogs/${params.id}`);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      router.push("/profile");

      console.log("Deleting blog");
    } else {
      // User clicked "No", do nothing
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 rounded border w-[720px] border-gray-200">
        <h1 className="font-medium text-3xl">Edit Blog</h1>
        <p className="text-gray-600 mt-6">Edit your blog </p>
        <form onSubmit={handleSubmit}>
          <div className="mt-8 space-y-6">
            <div>
              <label className="text-sm text-gray-700 block mb-1 font-medium">Title</label>
              <input
                type="text"
                required
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3
              block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Title"
                value={blogData.blogTitle}
                onChange={(e) => setBlogData({ ...data, blogTitle: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1 font-medium">Content</label>
              <textarea
                rows={4}
                required
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3
              block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Content for your blog"
                value={blogData.blogContent}
                onChange={(e) => setBlogData({ ...data, blogContent: e.target.value })}
              />
            </div>
          </div>
          <div className="space-x-4 mt-8">
            <button
              type="submit"
              className="py-2 transition duration-100 px-4 bg-blue-500 text-white rounded hover:bg-blue-600
            active:bg-blue-700 disabled:opacity-50"
            >
              Submit changes
            </button>
            <button
              type="button"
              className="py-2 transition duration-100 px-4 border border-rose-400 text-white
           rounded hover:bg-rose-400 active:bg-rose-500 bg-rose-400 disabled:opacity-50"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="py-2 transition duration-100 px-4 bg-white border border-gray-200 text-gray-600
           rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
              onClick={() => router.back()}
            >
              Go back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

async function getBlogById(id: string) {
  const res = await axios.get(`/api/blogs/${id}`);

  return res.data.blog;
}
