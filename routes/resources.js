import express from 'express';
import { requireAuth } from './middleware/auth.js';
import {
   getAllResources, 
   addResource, 
   uploadFile, 
   downloadFile, 
   searchResources
  } from '../controllers/resources.js';

  const router = express.Router();

  router.get('/resources', requireAuth, getAllResources);
  router.post('/resources', requireAuth, addResource);
  router.post('/upload', requireAuth, uploadFile);
  router.get('/download/:id', requireAuth, downloadFile);
  router.get('/search', requireAuth, searchResources);


  
export default router;