import React, { useState } from "react";

import loginService from "../services/loginService";
import blogService from "../services/blogService";

const Signup = (setUser, _user, setErrorMessage) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        name,
        username,
        password
      });

      console.log("response:", user);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setName("");
      setUsername("");
      setPassword("");
      console.log("response received");
      console.log(_user);
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        name
        <input
          type="text"
          value={name}
          name="Name"
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default Signup;
