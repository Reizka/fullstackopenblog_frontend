import React, { useState } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import Blog from "./components/Blog";

const Notification = ({ message }) => {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
};
function App() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  return (
    <div className="App">
      <h1>Blog Posts</h1>
      {errorMessage !== null && Notification(errorMessage)}

      <h2>Login</h2>
      {user === null ? (
        SignUp(setUser, setErrorMessage)
      ) : (
        <div>
          <p>{user.name} logged in</p>
          {Blog.BlogForm(setErrorMessage)}
        </div>
      )}
      <h2>Blogs</h2>
    </div>
  );
}

export default App;
