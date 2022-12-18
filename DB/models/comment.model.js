import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    content: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    postId: {

        type: mongoose.Schema.ObjectId,
        ref: "post",

    }
})

const commentModel = mongoose.model('comment', commentSchema)
export default commentModel;