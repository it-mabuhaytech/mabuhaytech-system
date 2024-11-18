// components/ProfileDropdown.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { User } from 'lucide-react';

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    // Clear authentication (this is just a simulation)
    localStorage.removeItem('authenticated');
    router.push('/login/page'); // Redirect to login
  };

  return (
    <div onClick={toggleDropdown} className="relative inline-block py-2 px-4 rounded-xl shadow-md text-left hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
      <User
        className='flex items-center justify-between w-full rounded-md shadow-sm text-sm font-medium text-gray-700'
      >
      </User>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <Link href="/profile">
              <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile Settings
              </div>
            </Link>
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
