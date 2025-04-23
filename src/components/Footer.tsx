import React from "react";

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
        </div>

        <div className="border-t dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-body">© 2025 Pathfinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
