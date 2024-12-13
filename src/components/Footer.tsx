// src/components/Footer.tsx
import React from "react";

const Footer = () => {
  return (
    <footer className="section-light border-t dark:border-gray-800">
      <div className="container-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="heading-3 heading-primary mb-4">Pathfinder</h3>
            <p className="text-body mb-4">
              Navigate your career journey with AI-powered insights and expert
              guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="footer-link">
                Twitter
              </a>
              <a href="#" className="footer-link">
                LinkedIn
              </a>
              <a href="#" className="footer-link">
                Facebook
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="heading-3 mb-4 dark:text-text-dark">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="heading-3 mb-4 dark:text-text-dark">Contact</h4>
            <ul className="space-y-2">
              <li className="text-body">info@pathfinder.com</li>
              <li className="text-body">+1 (555) 123-4567</li>
              <li className="text-body">123 Career Street</li>
              <li className="text-body">San Francisco, CA 94105</li>
            </ul>
          </div>
        </div>

        <div className="border-t dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-body">© 2024 Pathfinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
