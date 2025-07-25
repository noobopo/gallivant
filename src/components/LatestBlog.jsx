import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import axios from 'axios';
import 'aos/dist/aos.css';
import UserDetail from './UserDetail';
import Connect from './Connect';
import { Link } from 'react-router-dom';

const BlogCard = ({ item }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div
            data-aos="fade-up"
            className="flex flex-col md:flex-row gap-4 shadow-md p-4 rounded-lg bg-white"
        >
            <div className="flex-shrink-0">
                <div className="relative w-full md:w-64 h-44 overflow-hidden rounded-lg">
                    <img
                        src={item.imgUrl}
                        alt={item.title}
                        onLoad={() => setIsLoaded(true)}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                            isLoaded ? 'blur-0' : 'blur-sm'
                        }`}
                    />
                </div>
            </div>

            <div className="flex flex-col justify-between">
                <div>
                    <Link to={`/${item._id}`}><h2 className="text-lg md:text-xl font-semibold text-gray-800">{item.title}</h2></Link>
                    <div className="text-sm text-gray-500 mt-1 flex flex-wrap gap-1">
                        <span className="text-orange-500 font-medium">Post</span>
                        <span>By</span>
                        <span className="font-semibold text-gray-700">
                            <UserDetail user={item.user} />
                        </span>
                        <span className="mx-1">—</span>
                        <span>
                            {new Date(item.createdAt).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </span>
                        <span className="mx-1">—</span>
                        <span className="text-orange-500 cursor-pointer">50 comment</span>
                    </div>

                    <p className="text-gray-600 mt-2 text-sm">
                        {item.description.slice(0, 120)}...
                    </p>
                </div>

                <div className="mt-2">
              
                      <Link to={`/${item._id}`}><span className="text-orange-500 text-sm cursor-pointer hover:underline">
                        READ MORE .....
                    </span></Link>
                </div>
            </div>
        </div>
    );
};

const SkeletonCard = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 rounded-lg bg-gray-200 animate-pulse">
            <div className="w-full md:w-64 h-44 bg-gray-300 rounded-md" />
            <div className="flex flex-col justify-between flex-1">
                <div className="space-y-2 mt-2 md:mt-0">
                    <div className="h-5 bg-gray-300 rounded w-3/4" />
                    <div className="h-4 bg-gray-300 rounded w-1/2" />
                    <div className="h-3 bg-gray-300 rounded w-full" />
                    <div className="h-3 bg-gray-300 rounded w-2/3" />
                </div>
                <div className="mt-2 h-4 bg-gray-300 rounded w-1/4" />
            </div>
        </div>
    );
};

const LatestBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });

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

    const currentPost = blogs.slice(0, 3);
    const title = blogs.slice(0, 8);

    return (
        <>
            <h1 className='text-3xl font-bold text-center underline underline-offset-4 decoration-1'>My Latest Blogs</h1>
            <div className="flex flex-col lg:flex-row justify-center gap-10 w-full px-4 py-6">
                <div className="flex flex-col gap-6 w-full lg:w-[60vw]">
                    {loading
                        ? [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
                        : currentPost.map((item) => <BlogCard key={item._id} item={item} />)
                    }
                </div>

                <div className="w-full lg:w-1/4 flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row lg:flex-col gap-4 w-full">
                        <div className="w-full md:w-1/2 lg:w-full shadow-md p-4 rounded-md bg-white">
                            <h1 className="font-bold mb-3">Popular Posts</h1>
                            <div className="flex flex-col gap-2">
                                {
                                    (loading ? [...Array(5)] : title).map((it, i) => (
                                    <h2
                                        key={i}
                                        className={`font-medium text-sm ${
                                            loading
                                                ? 'bg-gray-300 h-4 rounded animate-pulse w-3/4'
                                                : 'text-blue-500 underline hover:text-blue-700 cursor-pointer'
                                        }`}
                                    >
                                        {!loading && it.title}
                                    </h2>
                                ))}
                            </div>
                        </div>
                        <div data-aos="flip-right" className="w-full md:w-1/2 lg:w-full">
                            <Connect />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LatestBlog;
