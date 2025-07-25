import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import context from '../context/AppContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import FatchUserBlog from '../components/FatchUserBlog';

const Profile = () => {
  const auth = useContext(context);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const api = await axios.get(
          `https://restart-gcl2.onrender.com/api/user/myprofile`,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        auth.setUser(api.data.user);
        auth.setIsAuthanticated(true);
      } catch (err) {
        toast.error(err.response.data.message);
        auth.setIsAuthanticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const api = await axios.get(
        `https://restart-gcl2.onrender.com/api/user/logout`,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      toast.success(api.data.message);
      auth.setIsAuthanticated(false);
      auth.setUser(null);
      navigate('/');
    } catch (err) {
      toast.error('Logout failed. Please try again.');
      console.error('Logout error:', err);
    }
  };

  if (loading) {
    return (
      <div className="h-[83.4vh] flex justify-center items-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <div className="w-full bg-gray-100 flex items-start justify-center px-4 pt-22">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-500">
                <img
                  src="https://i.pravatar.cc/300"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/fallback-avatar.png'; // provide a local fallback if needed
                  }}
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {auth?.user?.name || 'Unknown User'}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {auth?.user?.email || 'No email available'}
                </p>
                <p className="text-gray-600 mt-3">
                  Welcome to your profile page. You can manage your blogs and account here.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                  <Link to="/addblog">
                    <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition">
                      Add Blog
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      <FatchUserBlog />
      </div>
    </>
  );
};

export default Profile;
