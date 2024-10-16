import React, { ReactNode } from 'react';
import { TopNav } from './top-nav';
import { Footer } from './footer';
import { WelcomePage } from './welcome-page';
import TimeLogger from '../timelogger/page';

interface LayoutProps {
    children: ReactNode;
  }

const Layout: React.FC<LayoutProps>  = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <TopNav/>
      <div className="mt-3"></div>
      <TimeLogger/>
      <WelcomePage/>
      <div>
        {children}
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;