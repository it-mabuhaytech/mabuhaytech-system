// components/Sidebar.tsx
import React from 'react';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    loadComponent: (component: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, loadComponent }) => {
    return (
        <div
            className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={toggleSidebar}
        >
            <div
                className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-end p-4">
                    <button onClick={toggleSidebar} className="text-gray-500">
                        &times;
                    </button>
                </div>
                <nav className="p-4">
                    <ul>
                        <li className="py-2">
                            <button onClick={() => loadComponent('home')} className="w-full text-left">
                                Home
                            </button>
                        </li>
                        <li className="py-2">
                            <button onClick={() => loadComponent('timelogshistory')} className="w-full text-left">
                                Time Logs History
                            </button>
                        </li>
                        <li className="py-2">
                            <button onClick={() => loadComponent('healthcheck')} className="w-full text-left">
                                Health Checker
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
