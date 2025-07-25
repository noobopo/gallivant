import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import context from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

const FatchUserBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const auth = useContext(context)
    const navigate = useNavigate()

    const deleteBlog = async (id) => {
        try {
            const api = await axios.delete(
                `https://restart-gcl2.onrender.com/api/blog/delete/${id}`,
                { withCredentials: true }
            );
            toast.success(api.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const api = await axios.get(
                    `https://restart-gcl2.onrender.com/api/blog/myblog`,
                    { withCredentials: true }
                );
                setBlogs(api.data.blog);
            } catch (err) {
                console.error('Failed to fetch blogs', err);
                toast.error('Failed to fetch your blogs');
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, []);

    const editBlog = async (id) => {
        auth.setId(id)
        navigate('/addblog')
    }

    if (loading) {
        return (
            <div className="h-[83vh] flex justify-center items-center">
                <p className="text-gray-600">Loading your blogs...</p>
            </div>
        );
    }

    return (
        <div className="min-h-[83vh] bg-gray-100 py-10 px-4">
            <Toaster position="top-center" reverseOrder={false} />
            <div className=" lg:px-12 mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div key={blog._id} className="bg-white shadow-md rounded-xl">
                            <Link to={`/${blog._id}`}>
                                <img
                                    src={blog.imgUrl || '/fallback.jpg'}
                                    alt="Blog"
                                    className="w-full h-72 object-cover rounded-lg mb-4"
                                />
                            </Link>
                            <div className=' p-3'>
                                <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
                                <p className="text-gray-600 mt-2 line-clamp-3">
                                    {blog.description}
                                </p>

                                <div className="mt-4 flex gap-4">
                                    <button onClick={() => editBlog(blog._id)} className="bg-blue-500 hover:bg-blue-600 text-white px-7 py-2 rounded transition">
                                        Update
                                    </button>
                                    <button onClick={() => deleteBlog(blog._id)} className="bg-red-500 hover:bg-red-600 text-white px-7 py-2 rounded transition">
                                        Delete
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-2 text-gray-600">
                        You haven't added any blogs yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default FatchUserBlog;
