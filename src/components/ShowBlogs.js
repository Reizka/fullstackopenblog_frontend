import React from 'react';
import Blog from './Blog';
import Notification from './Notification';
import { LikeBlog } from './LikeBlogButton';
import { RemoveBlog } from './RemoveBlogButton';
import tgl from './Togglable';
import { largeToSmallLikesSort } from '../utility/sorter';

const TogglableField = tgl.TogglableField;
const ShowBlogs = ({ blogs, setBlogs, user }) => {
  console.log(blogs);
  try {
    if (!blogs) {
      return <></>;
    } else {
      const bs = largeToSmallLikesSort(blogs);
      const formatedBlogs = bs.map(b => {
        return (
          <li className="blogpost" key={b.id}>
            <TogglableField buttonLabel={b.title}>
              <Blog blog={b}/>
              <LikeBlog blogs={blogs} id={b.id} setBlogs={setBlogs} />
              <RemoveBlog
                blogs={blogs}
                blog={b}
                user={user}
                setBlogs={setBlogs}
              />
            </TogglableField>
          </li>
        );
      });
      return formatedBlogs;
    }
  } catch (error) {
    console.log('error', error);
  }
};

export default ShowBlogs;