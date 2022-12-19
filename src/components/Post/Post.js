import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { baseURL } from '../../utils/constants';
import { handleLike } from '../../helpers/handleLike';
import Button from '../Button/Button';
import CreateComment from '../CreateComment/CreateComment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { handleDelete } from '../../helpers/handleDelete';
import { modules } from '../../context/index';
import './styles.css';
const { useModal, useUser, useToast } = modules;

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

  const { handleToast } = useToast();

  const [, setModal] = useModal();

  const { token } = useUser();

  const dateTime = format(new Date(createdAt), 'yyyy-MM-dd');
  const dateWithHour = format(new Date(createdAt), 'hh:mm - dd/MM/yyyy');

  //HACER QUE LA X NO APAREAZCA SI NO ERES DUEÑO DEL POST ! . Y AESTHETIK IT

  //FIX THE ERROR MESSAGE WHEN YOU CANT DELETE THE IMAGE BECAUSE IS NOT YOURS

  //AND SOMEHOW THE LIKE FUNCTIOJNABILITY IS NOT WORKIGF < :)

  //AND THE SEARCH BAR IS NOT WORKING EITHER :)))

  //MODAL PARA PREGUNTAR IS ESTAS SEGURO DE HACJER ESTO=

  //HACER PAGINA DETALLE ESPWECIFICA DECADA POST

  //MODIFICAR LOS ENDPOINTS DE LA DATABASE PARA QUE SEA CUANDO ESRTAS EN LOCALJOSt
  //USAR LOCALGOST O SINO USAR https://instaxaxa-4j7jq.ondigitalocean.app

  return (
    <article className="post-container">
      <img src={`${baseURL}/${picture}`} alt="pic" className="post-image" />
      <div className="post-info">
        <div className="like-container">
          <button
            onClick={
              token
                ? () => handleDelete(setUpdate, handleToast, id, token)
                : null
            }
          >
            X
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

          <div>
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
