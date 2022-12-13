import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useUser } from '../../context/UserContext';
import { useModal } from '../../context/ModalContext';
import { baseURL } from '../../utils/constants';
import { handleLike } from '../../helpers/handleLike';
import Button from '../Button/Button';
import CreateComment from '../CreateComment/CreateComment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './styles.css';

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

  const handleDelete = async () => {
    await fetch(`${baseURL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    })
      .then((json) => json.json())
      .then((data) => data);

    setUpdate((prev) => !prev);
  };

  return (
    <article className="post-container">
      <img src={`${baseURL}/${picture}`} alt="pic" className="post-image" />

      <div className="post-info">
        <div className="like-container">
          <button onClick={token ? () => handleDelete() : null}>
            NO ENTIENDO
          </button>
          <button
            onClick={token ? () => handleLike(token, id, setUpdate) : null}
          ></button>
          {likedByMe ? (
            <FavoriteIcon
              sx={{ color: 'red', cursor: token ? 'pointer' : 'default' }}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{ cursor: token ? 'pointer' : 'default' }}
            />
          )}

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
