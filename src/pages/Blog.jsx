import { useState } from 'react';
import BlogsContent from "../components/BlogsContent";
import CreateBlogWizard from "../components/CreateBlogWizard";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [showCreateBlogWizard, setShowCreateBlogWizard] = useState(false);

  return (
    <div className="p-6">
      <BlogsContent
        blogs={blogs}
        setBlogs={setBlogs}
        setShowCreateBlogWizard={setShowCreateBlogWizard}
      />
      {showCreateBlogWizard && (
        <CreateBlogWizard
          onClose={() => setShowCreateBlogWizard(false)}
          onFinish={(newBlog) => {
            setBlogs([...blogs, newBlog]);
            setShowCreateBlogWizard(false);
          }}
        />
      )}
    </div>
  );
};

export default Blog;