import React, { useState, useEffect } from "react";
import blogService from "../services/blogService";
import Notification from "./Notification";
import { LikeBlog } from "./LikeBlogButton";
import { RemoveBlog } from "./RemoveBlogButton";
import tgl from "./Togglable";
import { largeToSmallLikesSort } from "../utility/sorter";

const Togglable = tgl.Togglable;
const TogglableField = tgl.TogglableField;
const Blog = ({ user }) => {
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
        <CreatePostForm user={user} addBlogPost={addBlogPost} />
      </Togglable>
      <FormattedBlogs blogs={blogs} setBlogs={setBlogs} user={user} />
    </>
  );
};

const FormattedBlogs = ({ blogs, setBlogs, user }) => {
  try {
    if (!blogs) {
      return <></>;
    } else {
      const bs = largeToSmallLikesSort(blogs);
      const formatedBlogs = bs.map((b, index) => {
        return (
          <li key={b.id}>
            <TogglableField buttonLabel={b.title}>
              <BlogContent
                url={b.url}
                author={b.author}
                title={b.title}
                likes={b.likes}
              />
              <LikeBlog blogs={blogs} id={b.id} setBlogs={setBlogs} />
              <RemoveBlog
                blogs={blogs}
                blog={b}
                user={user}
                setBlogs={setBlogs}
              />
            </TogglableField>
          </li>
        );
      });
      return formatedBlogs;
    }
  } catch (error) {
    console.log("error", error);
  }
};

const BlogContent = props => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={blogStyle}>
      <p>Author: {props.author}</p>
      <p>Title: {props.title}</p>
      <p>Likes:{props.likes}</p>
      <p>url: {props.url}</p>
    </div>
  );
};

const CreatePostForm = ({ user, addBlogPost }) => {
  const [message, setMessage] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
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
        <div className="create blog">Author:{user.name}</div>
        <div className="create blog">
          title:
          <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div className="create blog">
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
