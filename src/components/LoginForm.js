import React, { useState } from 'react';
import Notification from './Notification';
import loginService from '../services/loginService';
import blogService from '../services/blogService';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
      setUser(user);
    } catch (exception) {
      console.log(exception);
      setMessage('wrong credentials');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <Notification message={message} />{' '}
      <form onSubmit={handleLogin}>
        <div>
          username{' '}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />{' '}
        </div>{' '}
        <div>
          password{' '}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />{' '}
        </div>{' '}
        <button type="submit"> login </button>{' '}
      </form>{' '}
    </div>
  );
};

export default LoginForm;
