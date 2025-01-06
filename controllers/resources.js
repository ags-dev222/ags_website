import Resource from "../models/resources.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (_req, _file, cb)=>{
        cb(null, 'uploads/');
    },

    filename: (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer ({ storage });

//getting all resources
export const getAllResources = async (req, res)=>{
    try{
        const resources = await Resource.find();
        res.status(200).json(resources);
    } catch (error){
        res.status(500).json({ error: error.message});
    }
};

//adding a resource
export const addResource = async (req, res)=>{
    try{
        const { title, description, category, fileUrl } = req.body;
        const resource = new resources ({
            title,
            description,
            category,
            fileUrl,
            uploadedBy: req.user.id,
        });
        await resource.save();
        res.status(201).json(resource);
    } catch (error){
        res.status(500).json ({error: error.message });
    }
};


//upload file
export const uploadFile = [
    upload.single('file'),
    (req,res)=>{
        res.status(200).json( { fileUrl: `/uploads/${req.file.filename}` });

    },
];


//download file
export const downloadFile = (req, res)=>{
    const filePath = path.join('uploads', req.params.id);
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    }else {
        res.status(404).json( {error: 'File not found' });
    }
};


//Search resources
export const searchResources = async (req, res)=>{
    try{
        const { query, category} = req.query;
        const searchCriteria = {};

        if(query){
            searchCriteria.title = { $regex: query, $options: '1' };
        }
            if(category) {
                searchCriteria.category = category;
            }
            const resources = await resources.find(searchCriteria);
            res.status(200).json(resources);
        } catch (error) {
            res.status(500).json({ error: error.message });

    }
};