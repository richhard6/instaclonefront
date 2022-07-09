import React, { useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import Post from '../Post/Post';
import { useUser } from '../../context/UserContext';

import './styles.css';
import { useModal } from '../../context/ModalContext';
import CreatePost from '../CreatePost/CreatePost';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import useFetch from '../../hooks/useFetch';
import LoadingCircle from '../LoadingCircle/LoadingCircle';

const PostsList = () => {
  const [keyword, setKeyword] = useState('');

  const [, setModal] = useModal();

  const [update, setUpdate] = useState(false);

  const [posts, loading, error] = useFetch({ keyword, update });

  const ref = useRef();

  const { token } = useUser();

  const handleSearch = () => {
    setKeyword(ref.current.value);
    ref.current.value = '';
  };

  if (loading && !posts) return <LoadingCircle />;

  return (
    <main>
      <div className="search-container">
        {posts && (
          <div>
            <input
              placeholder="search by caption..."
              className="input-search"
              type="text"
              ref={ref}
            />

            <Button name={<SearchOutlinedIcon />} onClick={handleSearch} />
          </div>
        )}
        {token && (
          <Button
            onClick={() => setModal(<CreatePost setUpdate={setUpdate} />)}
            name={<AddAPhotoOutlinedIcon />}
          />
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
          <p>{`There's not posts yet, ${
            token ? 'click the icon on top to add one' : 'log in to add one'
          }`}</p>
        )}
      </div>
    </main>
  );
};

export default PostsList;
