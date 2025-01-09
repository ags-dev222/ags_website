import Resource from '../models/resources.js';
import fs from 'fs';
import path from 'path';

class ResourceService {
  // Get all resources
  static async getAllResources() {
    try {
      return await Resource.find();
    } catch (error) {
      throw new Error(`Error fetching resources: ${error.message}`);
    }
  }

  // Add a new resource
  static async addResource({ title, description, category, fileUrl, uploadedBy }) {
    try {
      const resource = new Resource({
        title,
        description,
        category,
        fileUrl,
        uploadedBy,
      });
      return await resource.save();
    } catch (error) {
      throw new Error(`Error adding resource: ${error.message}`);
    }
  }

  // Handle file upload
  static uploadFile(file) {
    if (!file) {
      throw new Error('No file provided');
    }

    const fileUrl = `/uploads/${file.filename}`;
    return fileUrl;
  }

  // Download file by ID
  static downloadFile(fileId) {
    const filePath = path.join('uploads', fileId);
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }
    return filePath;
  }

  // Search resources
  static async searchResources({ query, category }) {
    try {
      const searchCriteria = {};

      if (query) {
        searchCriteria.title = { $regex: query, $options: 'i' }; // Case-insensitive search
      }
      if (category) {
        searchCriteria.category = category;
      }

      return await Resource.find(searchCriteria);
    } catch (error) {
      throw new Error(`Error searching resources: ${error.message}`);
    }
  }
}

export default ResourceService;
