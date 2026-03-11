import { useState, useEffect } from 'react';

/**
 * Theme toggle hook for dark/light mode (Racing Day/Night)
 */
const useTheme = () => {
  const [theme, setTheme] = useState('dark'); // Default to night racing

  useEffect(() => {
    const savedTheme = localStorage.getItem('f1-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('light', savedTheme === 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('f1-theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  return { theme, toggleTheme, isDark: theme === 'dark' };
};

export default useTheme;
