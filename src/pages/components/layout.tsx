import React from 'react';
import { TopNav } from './top-nav';
import { Footer } from './footer';
import { WelcomePage } from './welcome-page';
import TimeLogger from '../timelogger/page';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <TopNav/>
      <div className="mt-3"></div>
      <TimeLogger/>
      <WelcomePage/>
      <Footer/>
    </div>
  );
};

export default Layout;