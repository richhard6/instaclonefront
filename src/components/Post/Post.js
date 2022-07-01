import React from 'react';
import './styles.css';

const Post = ({
  username,
  caption,
  picture,
  comments,
  createdAt,
  id,
  likes,
}) => {
  return (
    <article className="post-container">
      <img
        src={`http://localhost:4000/${picture}`}
        alt="pic"
        className="post-image"
      />
      <div>
        <button>heart</button> <span>{likes}</span>
        <div>
          <h3>{username}</h3>
          <p>{caption}</p>
          <time>{createdAt}</time>
        </div>
      </div>
    </article>
  );
};

export default Post;
