import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import axios from 'axios';
import Card from './Card';
import Pagination from './Pagination';
import 'aos/dist/aos.css'; // Don't forget AOS styles!

const Feature = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [postPerpage, setPostPerpage] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const api = await axios.get(`https://restart-gcl2.onrender.com/api/blog/all`, {
          withCredentials: true,
        });
        setBlogs(api.data.blog);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, []);



  const lastPostIndex = currentpage * postPerpage;
  const firstPostIndex = lastPostIndex - postPerpage;
  const currentPost = blogs.slice(firstPostIndex, lastPostIndex);

  return (
    <div className=''>
      <h1 className='text-2xl md:text-3xl text-blue-500 underline underline-offset-4 decoration-1 text-center mt-5 p-4'>
        Featured Explore
      </h1>

      <div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl shadow-md p-4 animate-pulse">
                <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <Card blogs={currentPost} />
            <Pagination
              totalposts={blogs.length}
              postperpage={postPerpage}
              setCurrentpage={setCurrentpage}
              currentpage={currentpage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Feature;
