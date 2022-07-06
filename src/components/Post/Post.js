import React, { useState } from 'react';
import './styles.css';
import { format } from 'date-fns';
import { useUser } from '../../context/UserContext';
import Button from '../Button/Button';
import { useModal } from '../../context/ModalContext';
import CreateComment from '../CreateComment/CreateComment';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { baseURL } from '../../utils/constants';
import { handleLike } from '../../helpers/handleLike';

const Post = ({
  username,
  caption,
  picture,
  comments,
  createdAt,
  id,
  likes,
  likedByMe,
  userId,
  setUpdate,
}) => {
  const [show, setShow] = useState(false);

  const [, setModal] = useModal();

  const { token } = useUser();

  const dateTime = format(new Date(createdAt), 'yyyy-MM-dd');
  const dateWithHour = format(new Date(createdAt), 'hh:mm - dd/MM/yyyy');

  return (
    <article className="post-container">
      <img src={`${baseURL}/${picture}`} alt="pic" className="post-image" />

      {/* Info del post */}

      <div className="post-info">
        <div className="like-container">
          <button
            onClick={token ? () => handleLike(token, id, setUpdate) : null}
          >
            {likedByMe ? (
              <FavoriteIcon
                sx={{ color: 'red', cursor: token ? 'pointer' : 'default' }}
              />
            ) : (
              <FavoriteBorderIcon
                sx={{ cursor: token ? 'pointer' : 'default' }}
              />
            )}
          </button>
          <span>{likes}</span>
        </div>

        <div className="post-info-inner">
          <div className="user-and-date">
            <Link to={`/profile/${userId}`}>
              <h3>@{username}</h3>
            </Link>

            <time dateTime={dateTime}>{dateWithHour}</time>
          </div>

          <p>{caption}</p>

          <div className="">
            <div>
              {comments && (
                <p
                  className="show-comments"
                  onClick={() => setShow((prevState) => !prevState)}
                >
                  {show ? 'Close comments' : 'View all comments'}
                </p>
              )}
              {!comments && <p></p>}
              {token && (
                <Button
                  name="Add comment"
                  onClick={() =>
                    setModal(
                      <CreateComment
                        setShow={setShow}
                        setUpdate={setUpdate}
                        setModal={setModal}
                        token={token}
                        id={id}
                      />
                    )
                  }
                />
              )}
            </div>
            <div className={`${show ? 'comments-section' : 'hide'}`}>
              {show &&
                comments &&
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
      </div>
    </article>
  );
};

export default Post;
