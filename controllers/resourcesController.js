import ResourceService from '../services/ResourceService.js';
import Resource from '../models/resources.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';


const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

//getting all resources
export const getAllResources = async (_req, res) => {
  try {
    const resources = await ResourceService.getAllResources();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//adding resources
export const addResource = async (req, res) => {
  try {
    const { title, description, category, fileUrl } = req.body;
    const uploadedBy = req.user.id;

    const resource = await ResourceService.addResource({
      title,
      description,
      category,
      fileUrl,
      uploadedBy,
    });

    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//upload a file
export const uploadFile = [
  upload.single('file'), // multer middleware to handle the file upload
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Construct the file URL (based on your file storage location)
      const fileUrl = `/uploads/${req.file.filename}`; 
      
      // Respond with the file URL
      res.status(200).json({ fileUrl });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];


//download a file
export const downloadFile = async (req, res) => {
  try {
    const resourceId = req.params.id;

    // Fetch the resource from the database
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    // filepath error
    const filePath = path.resolve('uploads', resource.fileUrl.trim());
    console.log('Constructed file path:', filePath);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.error('File not found at:', filePath);
      return res.status(404).json({ error: 'File not found' });
    }

    // Serve the file for download
    res.download(filePath, resource.fileUrl, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).json({ error: 'Error downloading file' });
      }
    });
  } catch (error) {
    console.error('Error in downloadFile:', error);
    res.status(500).json({ error: error.message });
  }
};



//search resources
export const searchResources = async (req, res) => {
  try {
    const { query, category } = req.query;
    const resources = await ResourceService.searchResources({ query, category });
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};