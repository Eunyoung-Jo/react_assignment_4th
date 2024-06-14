import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import Form from './components/Form';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Layout from './components/Layout';

const ProtectedRoute = ({ element }) => {
  const { accessToken } = useSelector((state) => state.auth);
  return accessToken ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProtectedRoute element={<Home />} />} />
          <Route path="detail/:id" element={<ProtectedRoute element={<Detail />} />} />
        </Route>
        <Route path="/login" element={<Form />} />
        <Route path="/register" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
