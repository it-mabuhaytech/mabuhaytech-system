import React, { useState } from 'react';
import TopNav from './top-nav';
import { Footer } from './footer';
import Sidebar from './sidebar';
import TimeLogger from './timelogger/page';
import HealthChecker from './health-checker/page';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState<React.ReactNode>(<TimeLogger />);

  const toggleSidebar = () => {
      setIsOpen(!isOpen);
  };

  const loadComponent = (component: string) => {
    switch (component) {
      case 'A':
        setCurrentComponent(<TimeLogger />);
        break;
      case 'B':
        setCurrentComponent(<HealthChecker />);
        break;
      default:
        setCurrentComponent(<TimeLogger />);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-background">
      <TopNav toggleSidebar={toggleSidebar}/>
      <div className="flex-grow p-4 relative">
          <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} loadComponent={loadComponent} />
          <main className="flex h-full w-full flex-1 flex-col items-center overflow-hidden">
              {currentComponent || children}
          </main>
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;