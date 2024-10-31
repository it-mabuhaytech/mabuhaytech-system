import React from 'react';
import { WelcomePage } from './welcome-page';
import TimeLogger from './timelogger/page';

const LandingPage: React.FC = () => {
  
  return (
    <div className="flex-col items-center min-h-screen bg-gray-10">
      <TimeLogger/>
      <WelcomePage/>
    </div>
  );
};

export default LandingPage;
