import React, { useState } from "react";
import blogService from "../services/blogService";

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
);

const BlogForm = ({ setErrorMessage }) => {
  const [blogPost, setBlogPost] = useState({});
  const [blog, setBlog] = useState(null);

  const handleBlogPost = async event => {
    event.preventDefault();
    try {
      const blog = await blogService.postBlogPost({
        blogPost
      });

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

export default { Blog, BlogForm };
