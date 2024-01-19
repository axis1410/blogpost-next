import Link from "next/link";
import React from "react";

interface BlogItemProps {
  blogs: Blog[];
  showCreatedBy?: boolean;
  isLink?: boolean;
}

const BlogItem: React.FC<BlogItemProps> = ({ blogs, showCreatedBy = true, isLink = false }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <li className="p-3 m-3 list-none rounded border border-gray-500" key={blog.id}>
          <h1 className="text-3xl font-font-semibold p-5">{blog.blogTitle}</h1>
          <hr />
          <p className="px-5 py-2">{blog.blogContent}</p>
          {showCreatedBy && <p className="p-5 italic">Created By: {blog.createdBy.name}</p>}
          {isLink && (
            <Link
              className="px-2 py-1 ml-3 mt-5 bg-gray-800 text-white rounded
              hover:bg-gray-600 transition duration-100"
              href={`/blog/${blog.id}`}
            >
              Edit
            </Link>
          )}
        </li>
      ))}
    </div>
  );
};

export default BlogItem;
