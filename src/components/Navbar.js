import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <nav className="p-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img src="/PokeApp.png" alt="PokeApp" className="h-16 cursor-pointer" />
        </Link>
        <div className="relative">
          <input
            type="checkbox"
            id="theme-toggle"
            checked={isDarkMode}
            onChange={handleThemeToggle}
            className="sr-only"
          />
          <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <div
                className={`block w-14 h-8 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${isDarkMode ? 'translate-x-full' : ''}`}
                />
              </div>
              <SunIcon
                className={`absolute top-1 left-1 w-6 h-6 text-yellow-500 ${isDarkMode ? 'hidden' : 'block'}`}
              />
              <MoonIcon
                className={`absolute top-1 right-1 w-6 h-6 text-black-400 ${isDarkMode ? 'block' : 'hidden'}`}
              />
            </div>
          </label>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
