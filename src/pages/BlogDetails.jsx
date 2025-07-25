import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserDetail from '../components/UserDetail';
import { FiCalendar } from 'react-icons/fi';
import Catagory from '../components/Catagory';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const api = await axios.get(`https://restart-gcl2.onrender.com/api/blog/blog/${id}`, {
          withCredentials: true,
        });
        setBlog(api.data.blog);
      } catch (error) {
        console.error('Failed to fetch blog:', error);
      }
    };
    fetchBlog();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {blog ? (
          <>
            <div className="bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 lg:p-10">
              <div className="w-full h-80 sm:h-96 lg:h-full">
                <img
                  src={blog.imgUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 leading-tight mb-6">
                    {blog.title}
                  </h1>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    {blog.description}
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <FiCalendar className="text-green-600" />
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <UserDetail user={blog.user} />

                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Category:</span>{' '}
                    <span className="text-orange-600">{blog.catagory}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <Catagory catagory={blog.catagory} />
            </div>
          </>
        ) : (
          <div className="text-center text-xl text-gray-500 py-24">Loading blog...</div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
