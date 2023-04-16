import React from 'react';
import Navbar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

const LayoutRoot = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default LayoutRoot;
