// src/components/Footer.tsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-primary-600 mb-4">
              Pathfinder
            </h3>
            <p className="text-gray-600 mb-4">
              Navigate your career journey with AI-powered insights and expert
              guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-600">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600">
                Facebook
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-600">info@pathfinder.com</li>
              <li className="text-gray-600">+1 (555) 123-4567</li>
              <li className="text-gray-600">123 Career Street</li>
              <li className="text-gray-600">San Francisco, CA 94105</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">
            © 2024 Pathfinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
