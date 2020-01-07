import React, { useState, useEffect } from 'react';
import blogService from '../services/blogService';
import BlogForm  from './BlogForm';
import ShowBlogs from './ShowBlogs';
import tgl from './Togglable';

const Togglable = tgl.Togglable;

const BlogView = ({ user }) => {
  const [blogs, setBlogs] = useState(null);
  const blogFormRef = React.createRef();

  useEffect(() => {
    const fetchData = async () => {
      const response = await blogService.getAll();
      console.log(response);
      setBlogs(response);
    };
    fetchData();
  }, []);

  const addBlogPost = newPost => {
    blogFormRef.current.toggleVisibility();
    const aBlogs = blogs.concat(newPost);
    setBlogs(aBlogs);
  };

  return (
    <>
      <Togglable buttonLabel="Create Blog" ref={blogFormRef}>
        <BlogForm user={user} addBlogPost={addBlogPost} />
      </Togglable>
      <ShowBlogs blogs={blogs} setBlogs={setBlogs} user={user} />
    </>
  );
};

export default BlogView;
