import React from 'react';

const Pagination = ({ totalposts, postperpage, setCurrentpage, currentpage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalposts / postperpage); i++) {
    pages.push(i);
  }

  const pageUp=()=>{
    window.scrollTo({ top: 700, behavior: 'smooth' });
  }
  return (
    <div className="w-full flex justify-center items-center gap-3 my-5">
      {pages.map((page) => (
        <button
          onClick={() => (setCurrentpage(page), pageUp())}
          key={page}
          className={`font-bold border rounded px-3 py-1 transition-all duration-200
            ${page === currentpage
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-800 border-gray-400 hover:bg-gray-100'}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
