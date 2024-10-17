// components/Sidebar.tsx
import { useState } from 'react';
import TimeLogger from '../timelogger/page';
import HealthChecker from '../health-checker/page';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [currentComponent, setCurrentComponent] = useState<JSX.Element | null>(null);

  const loadComponent = (component: string) => {
    switch (component) {
      case 'A':
        setCurrentComponent(<TimeLogger />);
        break;
      case 'B':
        setCurrentComponent(<HealthChecker />);
        break;
      default:
        setCurrentComponent(null);
    }
  };

  return (
    <div className="flex max-h-full w-full flex-1 overflow-hidden">
      <button
        onClick={toggleMenu}
        className="p-4 text-2xl bg-gray-800 text-white focus:outline-none z-50"
      >
        ☰
      </button>
      <nav
        className={`flex top-0 left-0 w-64 h-full bg-gray-800 text-white p-4 transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul>
          <li className="mb-4">
            <button
            onClick={() => loadComponent('A')}
            className="block w-full text-left p-2 hover:bg-gray-700 transition duration-300"
            >
            Home
            </button>
          </li>
          <li className="mb-4">
            <button
            onClick={() => loadComponent('B')}
            className="block w-full text-left p-2 hover:bg-gray-700 transition duration-300"
            >
            Health Checker
            </button>
          </li>
        </ul>
      </nav>
      <div className="flex h-full w-full flex-1 flex-col items-center overflow-hidden">
        {currentComponent}
      </div>
    </div>
  );
};

export default Sidebar;
