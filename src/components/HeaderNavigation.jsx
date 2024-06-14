import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #mint;
  border: solid;
  color: #fff;
  padding: 10px 10px;
  margin: 20px 0;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
`;

const MenuList = styled.ul`
  list-style-type: none;
  display: flex;
`;

const MenuItem = styled.li`
  margin-left: 20px;
  font-size: 20px;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const HeaderNavigation = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <Navigation>
        <Logo>My App</Logo>
        <MenuList>
          <MenuItem>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Home
            </Link>
          </MenuItem>
          {accessToken && (
            <MenuItem>
              <Link
                to="/profile"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                내 프로필
              </Link>
            </MenuItem>
          )}
          {accessToken ? (
            <MenuItem>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </MenuItem>
          ) : (
            <MenuItem>
              <Link
                to="/login"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                로그인
              </Link>
            </MenuItem>
          )}
        </MenuList>
      </Navigation>
    </HeaderContainer>
  );
};

export default HeaderNavigation;
