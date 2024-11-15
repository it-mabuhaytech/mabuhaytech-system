import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import ProfileDropdown from './profile-down';
import { Bell } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

import { fetchUserById } from '@/utils/userStore';

interface TopNavProps {
  toggleSidebar: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ toggleSidebar }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [itemExists, setItemExists] = useState<boolean>(false);
  const userLocalID = 'userid';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userID = localStorage.getItem('userid');
      setItemExists(username !== null);
      console.log(itemExists);
      const fetchUserId = async () => {
        const response = await fetchUserById(Number(userID));
        setUsername(response[0].username);
      }
      fetchUserId();
    }
  }, [userLocalID]);

    return (
        <header className="bg-white shadow-md w-full p-4 sticky top-0 z-10">
        <div className="container flex mx-auto justify-between items-center">
          <div className='flex-none w-14'>
          <button
                onClick={toggleSidebar}
                className="fixed top-2 left-4 z-50 py-4 px-6 text-black rounded-xl shadow-md"
            >
                ☰
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
            <ul className="flex space-x-4 items-center">
              <Bell/>
              <Separator orientation="vertical" />
              <li><a href="#features" className="text-black items-center hover:text-blue-500">{username}</a></li>
              <ProfileDropdown />
            </ul>
          </nav>
        </div>
      </header>
    );
}

export default TopNav;