import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-orange-400 text-white py-6 px-4 mt-auto ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm md:text-base font-medium">
          © 2020 ojjomedia All Right Reserved
        </p>

        <div className="flex gap-6 text-sm md:text-base font-medium">
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">About</a>
        </div>

        <div className="flex gap-3">
          <span className="bg-white text-orange-400 rounded-full p-2 hover:scale-105 transition">
            <FaFacebookF size={14} />
          </span>
          <span className="bg-white text-orange-400 rounded-full p-2 hover:scale-105 transition">
            <FaTwitter size={14} />
          </span>
          <span className="bg-white text-orange-400 rounded-full p-2 hover:scale-105 transition">
            <FaInstagram size={14} />
          </span>
          <span className="bg-white text-orange-400 rounded-full p-2 hover:scale-105 transition">
            <FaYoutube size={14} />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
