import { useState, useEffect } from 'react';

const CreateBlogWizard = ({ onClose, onFinish }) => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [author, setAuthor] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode preference on mount
  useEffect(() => {
    const theme = document.documentElement.classList.contains('dark');
    setIsDarkMode(theme);
  }, []);

  const handleFinish = () => {
    if (!title || !description || !content || images.length === 0) {
      setShowValidation(true);
      return;
    }

    const newBlog = {
      title,
      description,
      content,
      images,
      author,
    };

    onFinish(newBlog);
    setStep(1);
    setTitle('');
    setDescription('');
    setContent('');
    setImages([]);
    setAuthor('');
    setShowValidation(false);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm ${isDarkMode ? 'bg-black/40 dark:bg-black/60' : 'bg-white/30'}`}>
      <div className={`p-6 rounded-xl shadow-lg w-[600px] ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm">{step}/4</span>
          <h3 className="text-lg font-bold">
            {step === 1
              ? 'Create a Blog'
              : step === 2
              ? 'Blog Details'
              : step === 3
              ? 'Blog Content'
              : 'Author Info'}
          </h3>
          <button
            onClick={() => {
              onClose();
              setStep(1);
            }}
            className="text-sm hover:text-red-500"
          >
            ×
          </button>
        </div>

        {/* Step 1: Create a Blog */}
        {step === 1 && (
          <>
            <div className="flex items-center space-x-4 mb-4 flex-wrap">
              {images.map((image, index) => (
                <div className="relative" key={index}>
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-24 h-24 rounded"
                  />
                  <button
                    onClick={() =>
                      setImages(images.filter((_, i) => i !== index))
                    }
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
              <label className="border-dashed border-2 border-gray-300 dark:border-gray-600 rounded w-40 h-24 flex items-center justify-center cursor-pointer">
                <span className="text-xs text-center">
                  <span className="font-bold text-lg">+</span> <br /> Click to attach <br />
                  blog image(s)
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const newImages = files.map((file) => URL.createObjectURL(file));
                    setImages((prev) => [...prev, ...newImages]);
                  }}
                />
              </label>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-2 text-sm border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} rounded mb-3`}
              placeholder="Blog Title"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-2 border text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} rounded mb-4`}
              placeholder="Blog Description"
            />
          </>
        )}

        {/* Step 2: Blog Details */}
        {step === 2 && (
          <>
            <div className="flex items-center space-x-4 mb-4 flex-wrap">
              {images.map((image, index) => (
                <div className="relative" key={index}>
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-24 h-24 rounded"
                  />
                  <button
                    onClick={() =>
                      setImages(images.filter((_, i) => i !== index))
                    }
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
              <label className="border-dashed border-2 border-gray-300 dark:border-gray-600 rounded w-40 h-24 flex items-center justify-center cursor-pointer">
                <span className="text-xs text-center">
                  <span className="font-bold text-lg">+</span> <br /> Click to attach <br />
                  blog image(s)
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const newImages = files.map((file) => URL.createObjectURL(file));
                    setImages((prev) => [...prev, ...newImages]);
                  }}
                />
              </label>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-2 text-sm border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} rounded mb-3`}
              placeholder="Blog Title"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full p-2 border text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} rounded mb-4`}
              placeholder="Blog Content"
            />
          </>
        )}

        {/* Step 3: Blog Content */}
        {step === 3 && (
          <>
            <div className="flex items-center space-x-4 mb-4 flex-wrap">
              {images.map((image, index) => (
                <div className="relative" key={index}>
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-24 h-24 rounded"
                  />
                  <button
                    onClick={() =>
                      setImages(images.filter((_, i) => i !== index))
                    }
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
              <label className="border-dashed border-2 border-gray-300 dark:border-gray-600 rounded w-40 h-24 flex items-center justify-center cursor-pointer">
                <span className="text-xs text-center">
                  <span className="font-bold text-lg">+</span> <br /> Click to attach <br />
                  blog image(s)
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const newImages = files.map((file) => URL.createObjectURL(file));
                    setImages((prev) => [...prev, ...newImages]);
                  }}
                />
              </label>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full p-2 border text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} rounded mb-4`}
              placeholder="Blog Content"
            />
          </>
        )}

        {/* Step 4: Author Info */}
        {step === 4 && (
          <>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={`w-full p-2 text-sm border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} rounded mb-3`}
              placeholder="Author Name"
            />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-2 text-sm border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} rounded mb-3`}
              placeholder="Blog Title"
            />
            <div className="flex items-center space-x-4 mb-4 flex-wrap">
              {images.map((image, index) => (
                <div className="relative" key={index}>
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-24 h-24 rounded"
                  />
                  <button
                    onClick={() =>
                      setImages(images.filter((_, i) => i !== index))
                    }
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
              <label className="border-dashed border-2 border-gray-300 dark:border-gray-600 rounded w-40 h-24 flex items-center justify-center cursor-pointer">
                <span className="text-xs text-center">
                  <span className="font-bold text-lg">+</span> <br /> Click to attach <br />
                  blog image(s)
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const newImages = files.map((file) => URL.createObjectURL(file));
                    setImages((prev) => [...prev, ...newImages]);
                  }}
                />
              </label>
            </div>
          </>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => setStep(step > 1 ? step - 1 : 1)}
            className={`px-4 py-2 rounded text-xs ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
          >
            {step > 1 ? 'Back' : 'Cancel'}
          </button>
          <div className="flex space-x-2">
            {step < 4 && (
              <button
                onClick={() => setStep(step + 1)}
                className={`px-4 py-2 rounded text-xs ${isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'}`}
              >
                Next
              </button>
            )}
            {step === 4 && (
              <button
                onClick={handleFinish}
                className={`px-4 py-2 rounded text-xs ${isDarkMode ? 'bg-green-500 text-white' : 'bg-green-600 text-white'}`}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogWizard;
