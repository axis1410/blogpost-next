import axios from "axios";

export default async function getALlBlogs() {
  const res = await axios.get("/api/blogs");
  const blogData = res.data.blogs;

  return blogData;
}
