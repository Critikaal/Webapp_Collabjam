import React from 'react';
import NavBar from './NavBar';
import '../index.css'
import '../index.scss'

export const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
};