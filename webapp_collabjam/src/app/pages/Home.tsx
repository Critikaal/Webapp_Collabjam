import React from 'react';
import { Layout } from './components/Layout';
import Dashbord from './components/Dashbord';
import './index.scss'

export const Home = () => {
  return (
    <Layout>
      <Dashbord />
    </Layout>
  );
};