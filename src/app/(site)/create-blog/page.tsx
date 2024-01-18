"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CreateBlogPage() {
  const session = useSession();
  const router = useRouter();

  const [data, setData] = useState({
    blogTitle: "",
    blogContent: "",
  });

  // @ts-ignore
  const userId = session.data?.user?.id;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData = {
      blogTitle: data.blogTitle,
      blogContent: data.blogContent,
      userId,
    };

    try {
      const res = await axios.post("/api/blogs", postData);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-8 rounded border w-[720px] border-gray-200">
          <h1 className="font-medium text-3xl">Create Blog</h1>
          <p className="text-gray-600 mt-6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In quidem excepturi blanditiis
            suscipit officiis quos, iure necessitatibus harum est deleniti
          </p>
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
                  value={data.blogTitle}
                  onChange={(e) => setData({ ...data, blogTitle: e.target.value })}
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
                  value={data.blogContent}
                  onChange={(e) => setData({ ...data, blogContent: e.target.value })}
                />
              </div>
            </div>
            <div className="space-x-4 mt-8">
              <button
                type="submit"
                className="py-2 transition duration-100 px-4 bg-blue-500 text-white rounded hover:bg-blue-600
                active:bg-blue-700 disabled:opacity-50"
              >
                Create
              </button>
              <button
                type="button"
                className="py-2 transition duration-100 px-4 bg-white border border-gray-200 text-gray-600
               rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                onClick={() => router.push("/")}
              >
                Go back
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
