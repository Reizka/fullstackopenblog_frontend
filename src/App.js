import React, { useState, useEffect } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import loginService from "./services/loginService";
import blogService from "./services/blogService";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const logOut = () => {
    return () => {
      window.localStorage.removeItem("loggedBlogAppUser");
      setUser(null);
    };
  };

  console.log("USER: ", user);

  if (user === null) {
    return (
      <Togglable buttonLabel="Show Login form">
        <LoginForm setUser={setUser} />
      </Togglable>
    );
  } else {
    return (
      <div>
        <p>{user.name} logged in</p>
        <button name="logout" type="submit" onClick={logOut()}>
          logout
        </button>
        <Togglable buttonLabel="Show Blogs">
          <Blog user={user} />
        </Togglable>
      </div>
    );
  }
}
export default App;
