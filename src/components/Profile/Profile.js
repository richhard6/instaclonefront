import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { useUser } from '../../context/UserContext';
import Button from '../Button/Button';
import Post from '../Post/Post';
import UpdateProfile from '../UpdateProfile/UpdateProfile';
import EditIcon from '@mui/icons-material/Edit';

import useFetch from '../../hooks/useFetch';
import './styles.css';

const Profile = () => {
  const { userId } = useParams();

  const [, setModal] = useModal();

  const [username, setUsername] = useState();

  const [update, setUpdate] = useState(false);

  const { user } = useUser();

  const [posts, loading, error] = useFetch({ userId, update, setUsername });

  console.log(user);

  return (
    <main>
      <div className="user-data">
        <div className="username-container">
          <p>{username}</p>
          {user && user.id === Number(userId) && (
            <Button
              name={<EditIcon />}
              onClick={() =>
                setModal(
                  <UpdateProfile type="username" setUpdate={setUpdate} />
                )
              }
            />
          )}
        </div>

        {user && user.id === Number(userId) && (
          <div className="password-container">
            <p>******</p>
            <Button
              name={<EditIcon />}
              onClick={() =>
                setModal(
                  <UpdateProfile type="password" setUpdate={setUpdate} />
                )
              }
            />
          </div>
        )}
      </div>
      <div className="posts-list">
        {posts &&
          posts.map(
            ({
              caption,
              comments,
              createdAt,
              id,
              likes,
              picture,
              username,
              likedByMe,
              userId,
            }) => (
              <Post
                caption={caption}
                comments={comments}
                createdAt={createdAt}
                likes={likes}
                picture={picture}
                username={username}
                setUpdate={setUpdate}
                likedByMe={likedByMe}
                userId={userId}
                id={id}
                key={id}
              />
            )
          )}
      </div>
    </main>
  );
};

export default Profile;
