import React, { useState } from 'react';
import { Layout } from './components/Layout';
import Dashbord from './components/Dashbord';

export const Home = () => {
  return (
    <Layout>
      <Dashbord />
    </Layout>
  );
};