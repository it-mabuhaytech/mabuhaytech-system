import React from 'react';

export function TopNav(){
    return (
        <header className="bg-white shadow-md w-full p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">MabuhayTech Health Checker</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#features" className="text-gray-700 hover:text-blue-500">Features</a></li>
              <li><a href="#about" className="text-gray-700 hover:text-blue-500">About</a></li>
              <li><a href="#contact" className="text-gray-70A0 hover:text-blue-500">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
}

export default TopNav;