import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="section-light border-t dark:border-gray-800">
      <div className="container-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="heading-3 heading-primary mb-4">Pathfinder</h3>
            <p className="text-body mb-4">
              Navigate your career journey with AI-powered insights and expert
              guidance.
            </p>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-body">© 2025 Pathfinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
