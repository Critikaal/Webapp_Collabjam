import React from 'react';
console.log('RUNTIME REACT DEBUG', {
  version: (React as any).version,
  hasUseState: typeof (React as any).useState,
  hasCreateContext: typeof (React as any).createContext,
  keys: Object.keys(React).slice(0, 30),
});
import NavBar from './NavBar';

export const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
};