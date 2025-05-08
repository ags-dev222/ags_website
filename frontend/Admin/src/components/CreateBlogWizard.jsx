import { useState } from 'react';

const CreateBlogWizard = ({ onClose, onFinish }) => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [author, setAuthor] = useState('');
  const [showValidation, setShowValidation] = useState(false);

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
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-[600px]">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 text-sm">{step}/4</span>
          <h3 className="text-lg text-black font-bold">
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
            className="text-gray-500 hover:text-red-500"
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
              <label className="border-dashed border-2 border-gray-300 rounded w-40 h-24 flex items-center justify-center cursor-pointer">
                <span className="text-gray-400 text-xs text-center">
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
              className="w-full p-2 text-black text-xs border bg-gray-100 border-gray-300 rounded mb-3"
              placeholder="Blog Title"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border text-black text-xs bg-gray-100 border-gray-300 rounded mb-4"
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
              <label className="border-dashed border-2 border-gray-300 rounded w-40 h-24 flex items-center justify-center cursor-pointer">
                <span className="text-gray-400 text-xs text-center">
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
              className="w-full p-2 text-black text-xs border bg-gray-100 border-gray-300 rounded mb-3"
              placeholder="Blog Title"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border text-black text-xs bg-gray-100 border-gray-300 rounded mb-4"
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
              <label className="border-dashed border-2 border-gray-300 rounded w-40 h-24 flex items-center justify-center cursor-pointer">
                <span className="text-gray-400 text-xs text-center">
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
              className="w-full p-2 border text-black text-xs bg-gray-100 border-gray-300 rounded mb-4"
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
              className="w-full p-2 text-black text-xs border bg-gray-100 border-gray-300 rounded mb-3"
              placeholder="Author Name"
            />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 text-black text-xs border bg-gray-100 border-gray-300 rounded mb-3"
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
              <label className="border-dashed border-2 border-gray-300 rounded w-40 h-24 flex items-center justify-center cursor-pointer">
                <span className="text-gray-400 text-xs text-center">
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

        {/* Navigation Buttons */}
        <div className="flex justify-between text-xs mt-12 text-black">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="border px-8 py-2 rounded-full hover:bg-green-500"
            >
              Previous
            </button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="border text-black px-8 py-2 rounded-full hover:bg-green-500"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="border text-black px-8 py-2 rounded-full hover:bg-green-500"
            >
              Finish
            </button>
          )}
        </div>

        {showValidation && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md p-4 bg-red-100 border border-red-400 text-red-700 text-xs rounded shadow-lg">
            ⚠️ Please fill all required fields (title, description, content, and at least one image)!
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBlogWizard;