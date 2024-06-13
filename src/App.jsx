import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Form from './components/Form';
import axiosInstance from './api/axiosInstance';
import { useEffect } from 'react';
import { loginSuccess, logout } from './redux/slices/authSlice';

const ProtectedRoute = ({ element }) => {
  const { accessToken } = useSelector((state) => state.auth);
  return accessToken ? element : <Navigate to="/login" />;
};

function App() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      if (accessToken) {
        try {
          const response = await axiosInstance.get('/user');
          dispatch(loginSuccess({ user: response.data, accessToken }));
        } catch (error) {
          dispatch(logout());
        }
      }
    };
    checkAuth();
  }, [dispatch, accessToken]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/detail/:id" element={<ProtectedRoute element={<Detail />} />} />
        <Route path="/login" element={<Form />} />
        <Route path="/register" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
