/**
 * title
 * description
 * created at
 * uploaded by
 * category
 * file rl
 */

 import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    title:{ type: String, required: true},
    description: { type: String, required: true},
    category: { type: String, required: true},
    fileUrl: { type: String, required: true},
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: { type: Date, default: Date.now},
});

export default mongoose.model('Resource', resourceSchema);