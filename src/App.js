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

//REACT HELMET FOR seo

function App() {
  const [modal] = useModal();

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
