import React, { useEffect, useRef, useState } from 'react';
import Post from '../Post/Post';
import './styles.css';

const PostsList = () => {
  const [posts, setPosts] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');

  const ref = useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/posts?query=${keyword}`
        );

        const data = await response.json();
        if (data.status === 'error') {
          setError(data.message);
        } else {
          setPosts(data.data);
          console.log(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [keyword]);

  const handleSearch = () => {
    setKeyword(ref.current.value);
    ref.current.value = '';
  };

  return (
    <main>
      <div>
        <input type="text" ref={ref} />
        <button onClick={handleSearch}>search</button>
        {error && <p>{error}</p>}
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
                key={id}
              />
            )
          )}
      </div>
    </main>
  );
};

export default PostsList;
