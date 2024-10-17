import React from 'react';
import { TopNav } from './top-nav';
import { Footer } from './footer';
import Sidebar from './sidebar';


const Layout: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col bg-background">
      <TopNav/>
      <Sidebar/>
      <Footer/>
    </div>
  );
};

export default Layout;