import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import ProfileDropdown from './profile-down';
import { Bell } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from '../utils/userStore';

interface TopNavProps {
  toggleSidebar: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ toggleSidebar }) => {
  const [userID, setUserID] = useState<string | null>(null);
  const [itemExists, setItemExists] = useState<boolean>(false);
  const userLocalID = 'userid';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userID = localStorage.getItem('userid');
      setItemExists(userID !== null);
      setUserID(userID);
    }
  }, [userLocalID]);

    return (
        <header className="bg-white shadow-md w-full p-4 sticky top-0 z-10">
        <div className="container flex mx-auto justify-between items-center">
          <div className='flex-none w-14'>
          <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded"
            >
                Menu
            </button>
          </div>
          <div className="flex flex-grow ml-10 items-center">
            <Image
              src="/assets/PNG_MtechLogo.png"
              alt="MabuhayTech Corp."
              width={50}
              height={20}
            />
            <h1 className="text-2xl text-black font-bold ml-6">MabuhayTech System</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <Bell/>
              <Separator orientation="vertical" />
              <li><a href="#features" className="text-black hover:text-blue-500">{userID}</a></li>
              <div className="flex items-center">
                <ProfileDropdown />
              </div>
            </ul>
          </nav>
        </div>
      </header>
    );
}

export default TopNav;