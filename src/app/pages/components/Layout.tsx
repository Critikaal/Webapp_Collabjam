"use client";

import React from 'react';
import NavBar from './NavBar';

export const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
};