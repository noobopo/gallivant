import React from 'react';

const Connect = () => {
  return (
    <div className="bg-orange-400 text-white rounded-xl p-8 mt-10 max-w-md mx-auto shadow-lg">
      <h2 className="text-2xl font-bold mb-2">Subscribe Today</h2>
      

      <form className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Full Name"
          className="px-3 py-2 rounded-md bg-white text-gray-800 placeholder-gray-400 outline-none"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="px-3 py-2 rounded-md bg-white text-gray-800 placeholder-gray-400 outline-none"
        />
        <label className="text-sm flex items-center gap-2">
          <input type="checkbox" className="accent-white" />
          <span>You Agree To Our Company Privacy Policy</span>
        </label>
        <button
          type="submit"
          className="bg-white text-orange-500 font-semibold py-2 rounded-md hover:bg-orange-100 transition-all"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default Connect;
