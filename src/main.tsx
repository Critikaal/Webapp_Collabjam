import React from 'react';
import { createRoot } from 'react-dom/client';
import { Home } from './app/pages/Home';

const el = document.getElementById('root');
if (el) {
  createRoot(el).render(
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  );
}