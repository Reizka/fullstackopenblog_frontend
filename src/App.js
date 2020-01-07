import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import BlogView from './components/BlogView';
import tgl from './components/Togglable';
import blogService from './services/blogService';

const Togglable = tgl.Togglable;
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const logOut = () => {
    return () => {
      window.localStorage.removeItem('loggedBlogAppUser');
      setUser(null);
    };
  };

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

        <BlogView user={user} />
      </div>
    );
  }
}
export default App;
