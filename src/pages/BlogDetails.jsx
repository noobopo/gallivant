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
    <div className="h-[91.6vh] bg-gray-50 py-20 my-5 px-4">
      <div className="max-w-6xl mx-auto">
        {blog ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-xl">
              {/* Left - Image */}
              <div>
                <img
                  src={blog.imgUrl}
                  alt={blog.title}
                  className="w-full h-80 md:h-full object-cover rounded-xl"
                />
              </div>

              {/* Right - Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-blue-700 mb-4">{blog.title}</h1>
                  <p className="text-gray-700 text-base leading-relaxed mb-6">
                    {blog.description}
                  </p>
                </div>

                <div className="space-y-4 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
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

                  <div className="text-sm text-gray-500">
                    <span className="font-semibold">Category:</span> {blog.catagory}
                  </div>
                </div>
              </div>
            </div>

            {/* Catagory component at the bottom */}
            <div className="mt-12">
              <Catagory catagory={blog.catagory} />
            </div>
          </>
        ) : (
          <p className="text-center text-lg text-gray-500">Loading blog...</p>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
