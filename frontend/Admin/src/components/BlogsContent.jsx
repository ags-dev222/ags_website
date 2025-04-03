import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import SearchBar from './SearchBar'; // Import SearchBar (adjust path if needed)

const BlogsContent = ({ blogs, setBlogs, setShowCreateBlogWizard }) => {
  // State for search query and filtered blogs
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  // Update filteredBlogs when searchQuery or blogs change
  useEffect(() => {
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [searchQuery, blogs]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        {/* Search bar with icon */}
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 w-1/2 focus-within:ring-2 focus-within:ring-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-500 mr-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          < SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            className="bg-transparent text-black placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-300"
          />
        </div>
        {/* New Blog button */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-600"
          onClick={() => setShowCreateBlogWizard(true)}
        >
          New Blog
        </button>
      </div>
      {/* Blog list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onDelete={(id) => setBlogs(blogs.filter((b) => b.id !== id))}
            onEdit={(id, newData) =>
              setBlogs(blogs.map((b) => (b.id === id ? { ...b, ...newData } : b)))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default BlogsContent;