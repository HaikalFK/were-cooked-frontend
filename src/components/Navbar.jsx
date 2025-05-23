import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import  logo from '../assets/were-cooked.png'

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* <h1 className="font-bold text-lg">We're Cooked</h1> */}
        <img src={logo} alt="Logo" className="h-10" />


        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
  className="md:hidden absolute top-4 right-20 text-white dark:text-white bg-transparent text-2xl font-bold"
  onClick={() => setMenuOpen(!menuOpen)}
>
  ☰
</button>

        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:underline">Beranda</Link>
          <Link to="/bookmark" className="hover:underline">Bookmark</Link>
          <Link to="/about" className="hover:underline">Tentang</Link>
        </div>

        {/* Dark mode toggle */}
        <div className="ml-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isDark}
              onChange={() => setIsDark(!isDark)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-2 mt-4 px-4">
          <Link to="/" className="hover:underline">Beranda</Link>
          <Link to="/bookmark" className="hover:underline">Bookmark</Link>
          <Link to="/about" className="hover:underline">Tentang</Link>
        </div>
      )}
    </nav>
  );
}
