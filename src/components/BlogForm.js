import React, { useState } from 'react';
import blogService from '../services/blogService';
import Notification from './Notification';
import  { useField,useMessage } from '../utility/customHooks'

const BlogForm = ({ user, addBlogPost }) => {
  const message = useMessage('message');

  const title = useField('text');
  const url = useField('text');
  const handleBlogPost = async event => {
    event.preventDefault();
    try {
      if (title.value === '') {
        message.set('No title given!');
        setTimeout(() => {
          message.set('');
        }, 5000);
      } else {
        const blog = await blogService.create({
          title: title.value,
          url: url.value
        });
        title.reset();
        url.reset();
        console.log(blog, 'sent');
        addBlogPost(blog);
        message.set(`new blog ${blog.title} added`);
      }
    } catch (exception) {
      console.log(exception);
      message.set('could not post blog');
      setTimeout(() => {
        message.set('');
      }, 5000);
    }
  };

  return (
    <div>
      <Notification message={message.msg} />

      <form onSubmit={handleBlogPost}>
        <div className="create blog">Author:{user.name}</div>
        <div className="create blog">
            title:
          <input {...title}/>
        </div>
        <div className="create blog">
            url:
          <input {...url}/>
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;