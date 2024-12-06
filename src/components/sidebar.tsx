// components/Sidebar.tsx
import { checkUserRoleAdmin } from "@/utils/checkAccess";
import React, { useEffect, useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  loadComponent: (component: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  loadComponent,
}) => {
  const [userRoleIsAdmin, setUserRoleIsAdmin] = useState<boolean>();

  useEffect(() => {
    const setRole = async () => {
      const checkIfAdmin = await checkUserRoleAdmin();
      setUserRoleIsAdmin(checkIfAdmin);
    };
    setRole();
  }, []);

  // an array object to be map as link in the nav bar
  const publicNavData: {
    componentName: string;
    linkName: string;
  }[] = [
    {
      componentName: "home",
      linkName: "Home",
    },
    {
      componentName: "timelogshistory",
      linkName: "Time Logs History",
    },
    {
      componentName: "healthcheck",
      linkName: "Health Checker",
    },
  ];

  const adminNavData: {
    componentName: string;
    linkName: string;
  }[] = [
    {
      componentName: "registeruser",
      linkName: "Register User",
    },
    {
      componentName: "payslips",
      linkName: "Add Payslip",
    },
  ];

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={toggleSidebar}
    >
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
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
            {publicNavData.map((linkData) => (
              <li className="py-2" key={linkData.linkName}>
                <button
                  onClick={() => loadComponent(linkData.componentName)}
                  className="w-full text-left"
                >
                  {linkData.linkName}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {userRoleIsAdmin && (
          <div>
            <p className="bg-slate-200 text-center">Admin</p>
            <nav className="p-4">
              <ul>
                {adminNavData.map((linkData) => (
                  <li className="py-2" key={linkData.linkName}>
                    <button
                      onClick={() => loadComponent(linkData.componentName)}
                      className="w-full text-left"
                    >
                      {linkData.linkName}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
