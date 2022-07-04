import React, { useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import Post from '../Post/Post';
import { useUser } from '../../context/UserContext';

import './styles.css';
import { useModal } from '../../context/ModalContext';
import CreatePost from '../CreatePost/CreatePost';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Skeleton from '@mui/material/Skeleton';

const PostsList = () => {
  const [posts, setPosts] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');
  const [, setModal] = useModal();

  const [update, setUpdate] = useState(false);

  const ref = useRef();

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
          `http://localhost:4000/posts?query=${keyword}`,
          params
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
  }, [keyword, update, token]);

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

          <Button name={<SearchOutlinedIcon />} onClick={handleSearch} />
          {error && <p>{error}</p>}
        </div>
        {token && (
          <div>
            <Button
              onClick={() => setModal(<CreatePost setUpdate={setUpdate} />)}
              name={<AddAPhotoOutlinedIcon />}
            />
          </div>
        )}
      </div>
      <div className="posts-list">
        {posts ? (
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
          )
        ) : (
          <Skeleton
            variant="rectangular"
            width={'100%'}
            height={360}
            sx={{ bgcolor: 'blue.600' }}
          />
        )}
      </div>
    </main>
  );
};

export default PostsList;
