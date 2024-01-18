import axios from "axios";

export default function getBlogsByUser(blogs: Blog[], userId: string) {
  return blogs.filter((blog) => blog.createdBy.id === userId);
}
