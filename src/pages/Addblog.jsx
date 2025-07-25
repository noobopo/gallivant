import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import context from '../context/AppContext';

const Addblog = () => {
  const auth = useContext(context);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [catagory, setCatagory] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const api = await axios.get(
          `https://restart-gcl2.onrender.com/api/blog/blog/${auth.id}`,
          { withCredentials: true }
        );
        setTitle(api.data.blog.title);
        setCatagory(api.data.blog.catagory);
        setImgUrl(api.data.blog.imgUrl);
        setDescription(api.data.blog.description);
      } catch (error) {
        console.error('Failed to fetch blog:', error);
      }
    };

    if (auth.id) {
      fetchBlog();
    }
  }, [auth.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { title, description, imgUrl, catagory };

    try {
      if (!auth.id) {
        const api = await axios.post(
          `https://restart-gcl2.onrender.com/api/blog/new`,
          payload,
          { withCredentials: true }
        );
        toast.success(api.data.message);
        auth.setIsAuthanticated(true);
        navigate('/profile');
      } else {
        const api = await axios.put(
          `https://restart-gcl2.onrender.com/api/blog/update/${auth.id}`,
          payload,
          { withCredentials: true }
        );
        toast.success(api.data.message);
        auth.setIsAuthanticated(true);
        auth.setId('');
        navigate('/profile');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
      auth.setIsAuthanticated(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {auth.id ? 'Update Blog' : 'Create New Blog'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Blog Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter blog title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Category</label>
              <input
                value={catagory}
                onChange={(e) => setCatagory(e.target.value)}
                type="text"
                placeholder="Enter category"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Image URL</label>
              <input
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                type="url"
                placeholder="Paste image URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Blog Content</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="6"
                placeholder="Write your blog here..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none overflow-hidden"
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
                disabled={loading}
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                )}
                {loading ? 'Publishing...' : auth.id ? 'Update Blog' : 'Publish Blog'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addblog;
