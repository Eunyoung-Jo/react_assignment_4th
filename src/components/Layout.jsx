import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderNavigation from './HeaderNavigation';

const Layout = () => {
  return (
    <>
      <HeaderNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
