import React, { useState, useEffect } from "react";
import blogService from "../services/blogService";
import Notification from "./Notification";
import Togglable from "./Togglable";

const Blog = ({ user }) => {
  const [blogs, setBlogs] = useState(null);

  const blogFormRef = React.createRef();

  useEffect(() => {
    const fetchData = async () => {
      const response = await blogService.getAll();
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
        <CreatePostForm user={user} addBlogPost={addBlogPost} />
      </Togglable>
      <FormattedBlogs blogs={blogs} />
    </>
  );
};

const FormattedBlogs = ({ blogs }) => {
  try {
    if (!blogs) {
      return <></>;
    } else {
      const formatedBlogs = blogs.map(b => {
        return (
          <div>
            {b.title} {b.author}
          </div>
        );
      });
      return formatedBlogs;
    }
  } catch (error) {
    console.log("error", error);
  }
};

const CreatePostForm = ({ user, addBlogPost }) => {
  const [message, setMessage] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  console.log("1");
  //const [blogText, setBlogText] = useState("");
  const handleBlogPost = async event => {
    event.preventDefault();
    try {
      if (blogTitle === "") {
        setMessage("No title given!");
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } else {
        const blog = await blogService.create({
          title: blogTitle,
          url: blogUrl
        });
        //setBlogText("");
        setBlogTitle("");
        setBlogUrl("");
        console.log(blog, "sent");
        addBlogPost(blog);
        setMessage(`new blog ${blog.title} added`);
      }
    } catch (exception) {
      console.log(exception);
      setMessage("could not post blog");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <Notification message={message} />

      <form onSubmit={handleBlogPost}>
        <div class="create blog">Author:{user.name}</div>
        <div class="create blog">
          title:
          <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div class="create blog">
          url:
          <input
            type="text"
            value={blogUrl}
            name="Url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default Blog;
