import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: {type: String},
    message: {type: String},
    creator: {type: String},
    likeCount: {type: Number},
    createdAt: {type: Date},
    selectedFile: {type: String}
});

const postMessage = mongoose.model('postMessages', postSchema);

export default postMessage;