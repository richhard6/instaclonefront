import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Post from '../Post/Post';

const Profile = () => {
  const { userId } = useParams();

  const [posts, setPosts] = useState();

  const [username, setUsername] = useState();

  const [update, setUpdate] = useState(false);

  const [error, setError] = useState();

  const { token } = useUser();

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
          setUsername(data.data.user);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [token, userId]);

  return (
    <main>
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
