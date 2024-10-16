import React from 'react';
import Link from 'next/link';
import HealthChecker from '../../components/HealthChecker';
import { TopNav } from './top-nav';
import { WelcomePage } from './welcome-page';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <TopNav />
    
        <WelcomePage />
    </div>
  );
};

export default LandingPage;
