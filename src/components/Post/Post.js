import React, { useState } from 'react';
import './styles.css';
import { format } from 'date-fns';
import { useUser } from '../../context/UserContext';

const Post = ({
  username,
  caption,
  picture,
  comments,
  createdAt,
  id,
  likes,
  setUpdate,
}) => {
  const [show, setShow] = useState(false);

  const { token } = useUser();

  console.log(comments);

  const dateTime = format(new Date(createdAt), 'yyyy-MM-dd');
  const dateWithHour = format(new Date(createdAt), 'hh:mm - dd/MM/yyyy');

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:4000/posts/${id}/like`, {
        method: 'POST',
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();

      if (data.status === 'ok') {
        setUpdate((prev) => !prev);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <article className="post-container">
      <img
        src={`http://localhost:4000/${picture}`}
        alt="pic"
        className="post-image"
      />
      <div className="post-info">
        <div className="like-container">
          <button onClick={handleLike}>❤️</button> <span>{likes}</span>
        </div>
        <div>
          <h3>@{username}</h3>
          <p>{caption}</p>
          <time dateTime={dateTime}>{dateWithHour}</time>

          <p onClick={() => setShow((prevState) => !prevState)}>
            {show ? 'Close comments' : 'View all comments'}
          </p>
          <div className={`${show ? 'comments-section' : 'hide'}`}>
            {show &&
              comments
                .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                .map(({ comment, id, username }) => {
                  return (
                    <div key={id}>
                      <h4>{username}</h4>
                      <p> {comment}</p>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
