import Link from "next/link";
import React from "react";

interface BlogItemProps {
  blogs: Blog[];
}

const BlogItem: React.FC<BlogItemProps> = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Link href={`/home/blog/edit/${blog.id}`}>
          <li className="border-[1px] border-white border-dotted p-3 m-3" key={blog.id}>
            <h1>{blog.blogTitle}</h1>
            <p>{blog.blogContent}</p>
          </li>
        </Link>
      ))}
    </div>
  );
};

export default BlogItem;
