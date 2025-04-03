import React, { useState } from 'react';

const CreateBlogWizard = ({ onClose, onFinish }) => {
  const [step, setStep] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const [additionalImage1, setAdditionalImage1] = useState(null);
  const [additionalImage2, setAdditionalImage2] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [extraField, setExtraField] = useState('');

  const handleMainImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleAdditionalImage1Upload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAdditionalImage1(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleAdditionalImage2Upload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAdditionalImage2(URL.createObjectURL(e.target.files[0]));
    }
  };

  const renderStepOne = () => (
    <div className="p-6 space-y-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Create a Blog</h2>
        <span className="text-gray-400">1/2</span>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Main Blog Image</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-32 cursor-pointer">
            {mainImage ? (
              <img
                src={mainImage}
                alt="Main Blog Image"
                className="h-full w-full object-cover rounded"
              />
            ) : (
              <label className="text-sm text-gray-400 p-4 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleMainImageUpload}
                />
                <div className="flex flex-col items-center">
                  <span className="text-3xl">+</span>
                  <span>Main Image</span>
                </div>
              </label>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Additional Image 1</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-32 cursor-pointer">
            {additionalImage1 ? (
              <img
                src={additionalImage1}
                alt="Additional Image 1"
                className="h-full w-full object-cover rounded"
              />
            ) : (
              <label className="text-sm text-gray-400 p-4 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAdditionalImage1Upload}
                />
                <div className="flex flex-col items-center">
                  <span className="text-3xl">+</span>
                  <span>Image 1</span>
                </div>
              </label>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Additional Image 2</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-32 cursor-pointer">
            {additionalImage2 ? (
              <img
                src={additionalImage2}
                alt="Additional Image 2"
                className="h-full w-full object-cover rounded"
              />
            ) : (
              <label className="text-sm text-gray-400 p-4 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAdditionalImage2Upload}
                />
                <div className="flex flex-col items-center">
                  <span className="text-3xl">+</span>
                  <span>Image 2</span>
                </div>
              </label>
            )}
          </div>
        </div>
      </div>
      <input
        type="text"
        placeholder="Title"
        className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none text-gray-500 dark:text-gray-300"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="Business">Business</option>
        <option value="Tech">Tech</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>
      <input
        type="date"
        className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none text-gray-500 dark:text-gray-300"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none text-gray-500 dark:text-gray-300"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          onClick={() => setStep(2)}
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <div className="p-6 space-y-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Create a Blog</h2>
        <span className="text-gray-400">2/2</span>
      </div>
      <textarea
        placeholder="Additional notes or advanced settings..."
        className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none text-gray-500 dark:text-gray-300"
        rows={5}
        value={extraField}
        onChange={(e) => setExtraField(e.target.value)}
      ></textarea>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
          onClick={() => setStep(1)}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          onClick={() => {
            const newBlog = {
              id: Date.now(),
              mainImage: mainImage || require('../assets/rectangle2.png'), // Fallback to default
              additionalImages: [additionalImage1, additionalImage2].filter(Boolean),
              title,
              description,
              category,
              date,
              extraField,
            };
            onFinish(newBlog);
            onClose();
          }}
        >
          Finish
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-2xl relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          onClick={onClose}
        >
          ✕
        </button>
        {step === 1 ? renderStepOne() : renderStepTwo()}
      </div>
    </div>
  );
};

export default CreateBlogWizard;