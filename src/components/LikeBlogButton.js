import React from 'react';
import blogService from '../services/blogService';
export const LikeBlog = props => {
  const _blogs = [...props.blogs];
  const like = async key => {
    let ub = _blogs.find(b => b.id === key);
    ub.likes++;
    await blogService.update(key, {
      author: ub.userId.username,
      likes: ub.likes,
      title: ub.title,
      url: ub.url,
      userId: ub.userId.id
    });
    const uBlogs = _blogs.map(b => {
      if (b.id === ub.id) {
        return ub;
      } else {
        return b;
      }
    });
    props.setBlogs(uBlogs);
  };
  return (
    <button
      value={props.id}
      name="like"
      onClick={({ target }) => like(target.value)}
    >
      Like{' '}
    </button>
  );
};
