// src/components/Navbar.tsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-primary-600">
              Pathfinder
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-primary-600 px-3 py-2"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary-600 px-3 py-2"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary-600 px-3 py-2"
              >
                Services
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary-600 px-3 py-2"
              >
                Contact
              </a>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700">
                Sign In
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="block text-gray-600 hover:text-primary-600 px-3 py-2"
            >
              Home
            </a>
            <a
              href="#"
              className="block text-gray-600 hover:text-primary-600 px-3 py-2"
            >
              About
            </a>
            <a
              href="#"
              className="block text-gray-600 hover:text-primary-600 px-3 py-2"
            >
              Services
            </a>
            <a
              href="#"
              className="block text-gray-600 hover:text-primary-600 px-3 py-2"
            >
              Contact
            </a>
            <button className="w-full text-left bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
