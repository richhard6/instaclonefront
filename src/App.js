import './App.css';
import NavHeader from './components/NavHeader/NavHeader';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PostsList from './components/PostsList/PostsList';
import Modal from './components/Modal/Modal';
import { useModal } from './context/ModalContext';
import Profile from './components/Profile/Profile';

function App() {
  const [modal] = useModal();
  return (
    <>
      <NavHeader />
      {modal && <Modal>{modal}</Modal>}

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
