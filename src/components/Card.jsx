import { FiCalendar } from 'react-icons/fi';
import UserDetail from './UserDetail';
import { Link } from 'react-router-dom';

const Card = ({ blogs }) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4 md:px-10 lg:px-26">
      {blogs.map((blog, index) => (
        <Link key={index} to={`/${blog._id}`}><div
          key={index}
          className="flex flex-col shadow-md rounded-md overflow-hidden bg-white"
          data-aos="fade-up"
          // data-aos-delay={(index % 4) * 50}
        >
          <img
            src={blog.imgUrl}
            alt={blog.title}
            className="w-full h-80 object-cover"
          />
          <div className="p-4 flex flex-col justify-between gap-2 h-full flex-1">
            <p className="text-lg font-semibold truncate">{blog.title}</p>

            <p
              className="text-sm text-gray-600 overflow-hidden"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {blog.description}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-700 mt-auto">
              <FiCalendar className="text-green-600 w-4 h-4" />
              {new Date(blog.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
              <UserDetail user={blog.user} />
            </div>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default Card;
