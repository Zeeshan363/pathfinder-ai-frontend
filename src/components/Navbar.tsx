import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md transition-colors">
      <div className="container-padding">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="heading-3 text-primary-600">Pathfinder</span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/feedback" className="nav-link">
              Feedback
            </Link>
            <Link to="/signin" className="btn-primary">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden container-padding py-4">
          <div className="flex flex-col space-y-2">
            <a href="#" className="nav-link">
              Home
            </a>
            <a href="#" className="nav-link">
              About
            </a>
            <a href="#" className="nav-link">
              Services
            </a>
            <a href="#" className="nav-link">
              Contact
            </a>
            <Link to="/feedback" className="nav-link">
              Feedback
            </Link>
            <Link to="/signin" className="btn-primary w-full text-left">
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
