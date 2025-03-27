import React, { useState } from "react";

const CreateBlogWizard = ({ onClose, onFinish }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = () => {
    if (!title || !description) return alert("Title and description are required!");
    const newBlog = {
      id: Date.now(),
      title,
      category,
      description,
      image,
    };
    onFinish(newBlog);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-96">
        <button className="float-right text-gray-600" onClick={onClose}>✕</button>
        <h2 className="text-lg font-semibold mb-4">Create Blog</h2>

        <input type="text" placeholder="Title" className="w-full border p-2 rounded mb-2" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Category" className="w-full border p-2 rounded mb-2" value={category} onChange={(e) => setCategory(e.target.value)} />
        <textarea placeholder="Description" className="w-full border p-2 rounded mb-2" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        
        <input type="file" accept="image/*" className="mb-2" onChange={handleImageUpload} />
        {image && <img src={image} alt="Preview" className="w-full h-32 object-cover rounded mb-2" />}

        <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default CreateBlogWizard;
