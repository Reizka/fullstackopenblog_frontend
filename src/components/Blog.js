import React from 'react';
const Blog = props => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  return (
    <div style={blogStyle} className="blogpost">
      <p>Author: {props.blog.author}</p>
      <p>Title: {props.blog.title}</p>
      <p>Likes:{props.blog.likes}</p>
      <p>url: {props.blog.url}</p>
    </div>
  );
};


export default Blog;