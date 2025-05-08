import { useState } from 'react';
import BlogsContent from '../components/BlogsContent';
import CreateBlogWizard from '../components/CreateBlogWizard';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [showCreateBlogWizard, setShowCreateBlogWizard] = useState(false);
  const [hasStartedCreating, setHasStartedCreating] = useState(false);

  return (
    <div className="p-8">
      <BlogsContent
        blogs={blogs}
        setBlogs={setBlogs}
        setShowCreateBlogWizard={setShowCreateBlogWizard}
        hasStartedCreating={hasStartedCreating}
        setHasStartedCreating={setHasStartedCreating}
      />
      {showCreateBlogWizard && (
        <CreateBlogWizard
          onClose={() => {
            setShowCreateBlogWizard(false);
          }}
          onFinish={(newBlog) => {
            setBlogs([...blogs, newBlog]);
            setShowCreateBlogWizard(false);
            setHasStartedCreating(true);
          }}
        />
      )}
    </div>
  );
};

export default Blog;