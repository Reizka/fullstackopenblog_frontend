import React from 'react';
import blogService from '../services/blogService';

export const RemoveBlog = props => {
  const _blogs = [...props.blogs];
  const removeThisBlog = async key => {
    console.log('removing', key);
    await blogService.remove(key);

    const uBlogs = _blogs.filter(b => {
      return b.id !== key;
    });

    props.setBlogs(uBlogs);
  };

  if (props.blog.userId.username === props.user.username) {
    return (
      <button
        value={props.blog.id}
        name="Remove"
        onClick={({ target }) => removeThisBlog(target.value)}
      >
        Remove
      </button>
    );
  } else {
    return <></>;
  }
};
