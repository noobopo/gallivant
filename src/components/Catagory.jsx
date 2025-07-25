import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Catagory = ({ catagory }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
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

  const catBlog = blogs.filter((b) => b.catagory === catagory);

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 underline underline-offset-4 decoration-2 text-orange-600">
        Category: {catagory}
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading blogs...</p>
      ) : catBlog.length === 0 ? (
        <p className="text-gray-500">No blogs found for this category.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {catBlog.map((blog) => (
            <div key={blog._id} className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full md:w-1/2 h-48">
                <img
                  src={blog.imgUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <Link to={`/${blog._id}`}>
                  <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2></Link>
                  <p className="text-sm text-gray-600 mt-2">
                    {blog.description.slice(0, 120)}...
                  </p>
                </div>
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <span>{new Date(blog.createdAt).toLocaleDateString('en-GB')}</span>
                  <span>By User</span> {/* Replace with actual user name if needed */}
                </div>
                <div className="mt-2">
                  <Link
                    to={`/${blog._id}`}
                    className="text-orange-500 text-sm hover:underline"
                  >
                    Read more...
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catagory;
