'use client';

import React from "react";

function Footer() {
  return (
    <footer className="mt-10 mb-5 px-4 text-center text-white dark:text-white">
      <small className="mb-2 block text-xs">
        &copy; 2025 Zain. All rights reserved.
      </small>
      <p className="text-xs">
        <span className="font-semibold">About this website:</span> built with
        React & Next.js, TypeScript, Tailwind CSS, Framer Motion.
      </p>
    </footer>
  );
}

export default Footer;
