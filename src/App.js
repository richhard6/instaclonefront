import './App.css';
import NavHeader from './components/NavHeader/NavHeader';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PostsList from './components/PostsList/PostsList';
import Modal from './components/Modal/Modal';
import { useModal } from './context/ModalContext';
import Profile from './components/Profile/Profile';
import Toast from './components/Toast/Toast';

//factorizazfr esta mierda, hacer unm punmto de entrrada
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { baseURL } from './utils/constants';
import { useEffect } from 'react';

//REACT HELMET FOR seo

function App() {
  const [modal] = useModal();

  useEffect(() => {
    const doAsync = async () => {
      const wat = await fetch(`${baseURL}users/me`, {
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiY3JhenkiLCJpYXQiOjE2NzA4NDA5MTYsImV4cCI6MTY3MzQzMjkxNn0.u4Mkf6M1qVTP0i13mXEFhuqVnEHOcfB6yNvIV0mD0hU',
        },
      });

      const data = await wat.json();

      console.log(data);
    };

    doAsync();

    //HEALTHCHECKKK FROM FRONTEND ;:))
  }, []);

  return (
    <>
      <NavHeader />
      {modal && <Modal>{modal}</Modal>}
      <Toast />
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
