import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-lg hover:text-white hover:scale-105 duration-300">We're Cooked</Link>
        <Link to="/bookmark" className="hover:text-white hover:scale-105 duration-300">Bookmark</Link>
      </div>
    </nav>
  );
}
