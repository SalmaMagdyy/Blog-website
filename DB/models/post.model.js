import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }
    ]
})
const postModel = mongoose.model('post', postSchema)
export default postModel;