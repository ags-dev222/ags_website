import Resource from '../models/resources.js';
import fs from 'fs';
import path from 'path';
import { sendResourcePostNotification } from '../utils/email.js';
import { sendPushNotification } from '../utils/pushNotifs.js';

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
static async addResource({ title, description, category, fileUrl, uploadedBy, userEmail, deviceToken }) {
  try {
    // Create a new resource instance
    const resource = new Resource({
      title,
      description,
      category,
      fileUrl,
      uploadedBy,
    });

    // Save the resource to the database
    const savedResource = await resource.save();

    // Send email notification
    if (userEmail) {
      await sendResourcePostNotification(userEmail, { 
        title, 
        summary: description // Using the resource description as the summary
      });
    }

    // Send push notification
    if (deviceToken) {
      await sendPushNotification(deviceToken, { 
        title, 
        date: savedResource.createdAt, 
        description 
      });
    }

    return savedResource;
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

  //download file
  static async downloadFile(resourceId) {
    try {
      // Fetch resource from the database
      const resource = await Resource.findById(resourceId);
      if (!resource) {
        throw new Error('Resource not found');
      }
  
      // Construct the absolute file path
      const filePath = path.resolve(resource.fileUrl);
  
      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        throw new Error('File not found');
      }
  
      return filePath;
    } catch (error) {
      throw new Error(`Error in downloading file: ${error.message}`);
    }
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