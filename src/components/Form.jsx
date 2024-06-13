import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { loginSuccess, loginFailure, registerFailure, clearError } from '../redux/slices/authSlice';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const Form = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error } = useSelector((state) => state.auth);

  const isRegister = location.pathname === '/register';

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    try {
      if (isRegister) {
        const response = await axiosInstance.post('/register', { id: username, password, nickname });
        alert(response.data.message); // 회원가입 완료 메시지
        navigate('/login'); // 회원가입 성공 후 로그인 페이지로 이동
      } else {
        const response = await axiosInstance.post('/login', { id: username, password });
        dispatch(loginSuccess({
          user: {
            id: response.data.userId,
            avatar: response.data.avatar,
            nickname: response.data.nickname
          },
          accessToken: response.data.accessToken
        }));
        navigate('/profile'); // 로그인 성공 후 프로필 페이지로 이동
      }
    } catch (err) {
      if (isRegister) {
        dispatch(registerFailure(err.response.data.message));
      } else {
        dispatch(loginFailure(err.response.data.message));
      }
    }
  };

  return (
    <FormContainer>
      <FormTitle>{isRegister ? '회원가입' : '로그인'}</FormTitle>
      <StyledForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength="4"
          maxLength="10"
          required
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="4"
          maxLength="15"
          required
        />
        {isRegister && (
          <Input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            minLength="1"
            maxLength="10"
            required
          />
        )}
        <Button type="submit">{isRegister ? '회원가입' : '로그인'}</Button>
      </StyledForm>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button onClick={() => navigate(isRegister ? '/login' : '/register')}>
        {isRegister ? '로그인 페이지로' : '회원가입 페이지로'}
      </Button>
    </FormContainer>
  );
};

export default Form;
