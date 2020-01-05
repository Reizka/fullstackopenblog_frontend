import React, { useState } from "react";
import blogService from "../services/blogService";

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
);

const getAllBlogs = async (setErrorMessage, setBlog) => {
  console.log("starting");
  try {
    const blogs = await blogService.getAll();
    console.log(blogs);
    const sortedBlogs = blogs.map(b => {
      console.log(b);
      return Blog(b);
    });

    console.log("mapped", sortedBlogs);
    return sortedBlogs;
  } catch (error) {
    console.log("error", error);
    setErrorMessage("could not get blogs");
  }
};

const CreatePostForm = setErrorMessage => {
  const [blogPost, setBlogPost] = useState({});
  const [blog, setBlog] = useState(null);

  const handleBlogPost = async event => {
    event.preventDefault();
    try {
      const blog = await blogService.postBlogPost({ blogPost });
      setBlog(blog);
      setBlogPost("");
    } catch (exception) {
      setErrorMessage("could not post blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleBlogPost}>
      <input value={blogPost} onChange={handleBlogPost} />
      <button type="submit">save</button>
    </form>
  );
};

export default { Blog, CreatePostForm, getAllBlogs };
