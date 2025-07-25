import React, { useState, useEffect, useContext } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { CiUser } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import context from '../context/AppContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const auth = useContext(context);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] bg-black px-4 py-4 flex shadow-md justify-between items-center md:justify-around">
        <Link to="/">
          <h1 className="text-white text-3xl md:text-4xl font-bold">
            <span className="text-orange-500">Galli</span>
            <span className="text-cyan-400">Vant</span>
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-3">
          <input
            className="outline py-1 px-4 w-72 md:w-96 rounded-2xl bg-gray-200 border border-black"
            type="search"
            placeholder="Search your topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!auth.isAuthanticated ? (
            <>
              <Link to="/login">
                <button className="py-1.5 px-7 rounded bg-cyan-500 text-white hover:bg-white hover:text-black transition-all duration-500">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="py-1.5 px-5 rounded bg-gray-900 text-white border hover:bg-orange-500 transition-all duration-500">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <Link to="/profile">
              <button className="border-2 border-white p-1.5 rounded-full hover:scale-110 transition-all duration-500">
                <CiUser size={27} color="white" />
              </button>
            </Link>
          )}
        </div>

        <div className="md:hidden z-[101]">
          <button onClick={toggleSidebar}>
            {isOpen ? <FiX size={28} className="text-orange-500" /> : <FiMenu size={28} className="text-orange-500" />}
          </button>
        </div>
      </nav>

      <div className={`fixed top-0 right-0 h-full w-64 bg-white text-black transition-transform duration-300 ease-in-out z-[101] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end p-4">
          <button onClick={toggleSidebar} className="text-gray-700 hover:text-black">
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6 flex flex-col items-center justify-center gap-6">
          <input
            className="outline py-2 px-4 w-full rounded-2xl bg-gray-200 text-black border border-black"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {!auth.isAuthanticated ? (
            <>
              <Link to="/login">
                <button onClick={toggleSidebar} className="py-2 px-20 w-full rounded bg-cyan-500 text-white hover:bg-white hover:text-black transition-all duration-500">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button onClick={toggleSidebar} className="py-2 px-20 rounded w-full bg-gray-900 border text-white hover:bg-white hover:text-black transition-all duration-500">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Link to="/profile">
                <button onClick={toggleSidebar} className="border-2 border-black p-1.5 rounded-full hover:scale-110 transition-all duration-500">
                  <CiUser size={27} color="blue" />
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[90]" onClick={toggleSidebar} />
      )}
    </>
  );
};

export default Navbar;
