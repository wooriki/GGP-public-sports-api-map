import React, { useEffect, useRef, useState } from 'react';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
