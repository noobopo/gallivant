import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import UserDetail from '../components/UserDetail';
import { FiCalendar } from 'react-icons/fi';

const SearchResult = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const api = await axios.get(`https://restart-gcl2.onrender.com/api/blog/all`, {
                    withCredentials: true,
                });
                setBlogs(api.data.blog || []);
            } catch (err) {
                console.error("Failed to fetch blogs", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [query]);

    const searchResults = blogs.filter((b) =>
        b.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="p-6 max-w-5xl mx-auto h-[91.6vh]">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Search Results for: "<span className="text-blue-600">{query}</span>"
            </h2>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : searchResults.length === 0 ? (
                <p className="text-center text-gray-500">No results found.</p>
            ) : (
                <div className="flex flex-col gap-6">
                    {searchResults.map((blog) => (
                        <Link
                            to={`/${blog._id}`}
                            key={blog._id}
                            className="flex flex-col md:flex-row border rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300 bg-white"
                        >
                            <div className="w-full md:w-1/3 h-52 overflow-hidden">
                                <img
                                    src={blog.imgUrl}
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4 flex flex-col justify-between w-full">
                                <h3 className="text-xl font-semibold text-black mb-2">{blog.title}</h3>
                                <p className="text-sm text-gray-700 line-clamp-3">{blog.description}</p>
                                <span className="text-sm text-gray-700 line-clamp-3 flex gap-2 pt-3">
                                    <FiCalendar className="text-green-600 w-4 h-4" />
                                    {new Date(blog.createdAt).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </span>
                                <UserDetail user={blog.user} />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResult;
