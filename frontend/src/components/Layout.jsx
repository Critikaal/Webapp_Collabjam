import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function Layout() {
  const [setQuery] = useState('');

  return (
    <>
      <NavBar setQuery={setQuery} />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
