import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Profile = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const [imgFile, setImgFile] = useState(null);
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    setImgFile(e.target.files[0]);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessToken) {
      console.log('Access token not found.');
      return;
    }

    const formData = new FormData();
    if (imgFile) {
      formData.append('avatar', imgFile);
    }
    if (nickname) {
      formData.append('nickname', nickname);
    }

    try {
      const response = await axios.patch(`${BASE_URL}/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMessage(response.data.message);
      setSuccess(response.data.success);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('프로필을 업데이트하는 중 오류가 발생했습니다.');
      setSuccess(false);
    }
  };

  return (
    <Container>
      <Title>프로필 업데이트</Title>
      <FormContainer onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="avatar">프로필 이미지 업로드:</Label>
          <Input type="file" id="avatar" accept="image/*" onChange={handleFileChange} />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="nickname">변경할 닉네임:</Label>
          <Input
            type="text"
            id="nickname"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="변경할 닉네임을 입력하세요."
          />
        </InputGroup>
        <Button type="submit">프로필 업데이트</Button>
      </FormContainer>
      {message && (
        <p style={{ textAlign: 'center', marginTop: '10px', color: success ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </Container>
  );
};

export default Profile;
