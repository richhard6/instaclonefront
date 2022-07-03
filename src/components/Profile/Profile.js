import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { useUser } from '../../context/UserContext';
import Button from '../Button/Button';
import Post from '../Post/Post';
import UpdateProfile from '../UpdateProfile/UpdateProfile';
import './styles.css';

const Profile = () => {
  const { userId } = useParams();

  const [, setModal] = useModal();

  const [posts, setPosts] = useState();

  const [username, setUsername] = useState();

  const [update, setUpdate] = useState(false);

  const [error, setError] = useState();

  const { token, user } = useUser();

  console.log(user);

  useEffect(() => {
    const params = token
      ? {
          headers: {
            Authorization: token,
          },
        }
      : {};
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/users/${userId}/`,
          params
        );

        const data = await response.json();

        if (data.status === 'ok') {
          setPosts(data.data.posts);
          setUsername(data.data.user.username);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [token, userId, update]);

  return (
    <main>
      <div className="user-data">
        <div className="username-container">
          <p>{username}</p>
          {user && user.id === Number(userId) && (
            <Button
              name="Change username"
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
              name="Change password"
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
