import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  List,
  CreditCard,
  Settings,
  Plus,
  Mic,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  // Menu with paths added
  const menu = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/dashboard",
    },
    {
      name: "Scheduled Interviews",
      icon: <Calendar size={18} />,
      path: "/scheduled",
    },
    {
      name: "All Interview",
      icon: <List size={18} />,
      path: "/interviews",
    },
    {
      name: "Billing",
      icon: <CreditCard size={18} />,
      path: "/billing",
    },
    {
      name: "Settings",
      icon: <Settings size={18} />,
      path: "/settings",
    },
  ];

  return (
    <div className="h-screen w-64 bg-gray-100 border-r p-5 flex flex-col">
      {/* Logo */}
      <Link to='/'>
      <div className="flex items-center gap-2 mb-8" >
        <Mic className="text-blue-500" size={28} />
        <h1 className="text-2xl font-bold text-blue-500">
          VoicePrep
        </h1>
      </div>
      </Link>

      {/* Create Button */}
      <Link to="/create-interview">
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition mb-8">
          <Plus size={18} />
          Create New Interview
        </button>
      </Link>

      {/* Menu Links */}
      <nav className="flex flex-col gap-2">
        {menu.map((item, index) => {
          const isActive =
            location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${
                  isActive
                    ? "bg-gray-200 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
