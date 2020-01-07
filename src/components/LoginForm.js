import React, { useState } from 'react';
import Notification from './Notification';
import loginService from '../services/loginService';
import blogService from '../services/blogService';
import { useField,useMessage } from '../utility/customHooks';
const LoginForm = ({ setUser }) => {
  const message = useMessage('message');
  const username =  useField('text');
  const password =  useField('password');

  const handleLogin = async event => {
    event.preventDefault();
    if(username.value ==='' || password.value===''){
      message.set('username or password missing!')
      setTimeout(() => {
        message.set('');
      }, 5000);
    }else{
      try {
        const user = await loginService.login({
          username: username.value,
          password: password.value
        });

        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
        blogService.setToken(user.token);
        password.reset();
        username.reset();
        setUser(user);
      } catch (exception) {
        console.log('LOGIN',exception);
        message.set('wrong credentials');
        setTimeout(() => {
          message.set('');
        }, 5000);
      }
    }

  };
  console.log(message);
  return (
    <div>
      <Notification message={message.msg} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input  {type,value,changeOn, ...username} = username/>
        </div>
        <div>
          password
          <input {...password}/>
        </div>
        <button type="submit"> login </button>
      </form>
    </div>
  );
};

export default LoginForm;
