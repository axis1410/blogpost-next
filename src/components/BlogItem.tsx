import React from "react";

interface BlogItemProps {
  blogs: Blog[];
}

const BlogItem: React.FC<BlogItemProps> = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <li className="border-[1px] border-white p-3 m-3" key={blog.id}>
          <h1>{blog.blogTitle}</h1>
          <p>{blog.blogContent}</p>
          <p>Created By: {blog.createdBy.name}</p>
        </li>
      ))}
    </div>
  );
};

export default BlogItem;
