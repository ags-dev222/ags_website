import ResourceService from '../services/ResourceService.js';
import multer from 'multer';
import path from 'path';

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
  upload.single('file'),
  (req, res) => {
    try {
      const fileUrl = ResourceService.uploadFile(req.file);
      res.status(200).json({ fileUrl });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

//download a file
export const downloadFile = (req, res) => {
  try {
    const filePath = ResourceService.downloadFile(req.params.id);
    res.download(filePath);
  } catch (error) {
    res.status(404).json({ error: error.message });
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
