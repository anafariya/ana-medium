import { Blog } from "../hooks";
import Appbar from "./Appbar";
import { Avatar } from "./BlogCard";

const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="bg-gray-100 px-10 min-h-screen">
      <Appbar />
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <p className="text-sm text-gray-500 mb-4">
              {/* Add logic for displaying publication date */}
              Posted a few days ago
            </p>
            <p className="text-lg leading-relaxed">{blog.content}</p>
          </div>
          <div className="col-span-4 flex flex-col justify-start items-start">
            <div className="flex items-center mb-4">
              <Avatar name={blog.author.name} />
              <p className="ml-2 text-gray-700">{blog.author.name || "Joy Poy"}</p>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Crafting captivating tech blogs sharing insights with precision and flair.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
