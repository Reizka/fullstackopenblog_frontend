import React, { useState, useEffect } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import Blog from "./components/Blog";

function App() {
  const [user, setUser] = useState(null);
  const [blog, setBlog] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Blog.getAllBlogs(setErrorMessage);
      console.log("RE: ", response);
      setBlog(response);
    };
    fetchData();
  }, []);

  console.log(blog);
  return <div className="App">{blog}</div>;
}
/*
 <div className="App">
      <h1>Blog Posts</h1>
      {Blog.GetAll(setErrorMessage)}

      {errorMessage !== null && Notification(errorMessage)}

      <h2>Login</h2>
      {user === null ? (
        SignUp(setUser, user, setErrorMessage)
      ) : (
        <div>
          <p>{user.name} logged in</p>
          {Blog.GetAll(setErrorMessage)}
        </div>
      )}
      <h2>Blogs</h2>
    </div>
*/
export default App;
