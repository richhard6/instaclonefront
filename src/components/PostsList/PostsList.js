import React, { useEffect, useRef, useState, useCallback } from 'react';
import Button from '../Button/Button';
import Post from '../Post/Post';
import { useUser } from '../../context/UserContext';
import './styles.css';

const PostsList = () => {
  const [posts, setPosts] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');

  const [update, setUpdate] = useState(false);

  const ref = useRef();

  const { token } = useUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/posts?query=${keyword}`
        );

        const data = await response.json();
        if (data.status === 'error') {
          setError(data.message);
          setTimeout(() => {
            setError('');
          }, 2000);
        } else {
          setPosts(data.data);
          console.log(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [keyword, update]);

  const handleSearch = () => {
    setKeyword(ref.current.value);
    ref.current.value = '';
  };

  return (
    <main>
      <div className="search-container">
        <div>
          <input
            placeholder="search by caption..."
            className="input-search"
            type="text"
            ref={ref}
          />
          <Button name="search" onClick={handleSearch} />
          {error && <p>{error}</p>}
        </div>
        {token && (
          <div>
            <Button name="+" />
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
            }) => (
              <Post
                caption={caption}
                comments={comments}
                createdAt={createdAt}
                likes={likes}
                picture={picture}
                username={username}
                setUpdate={setUpdate}
                id={id}
                key={id}
              />
            )
          )}
      </div>
    </main>
  );
};

export default PostsList;
