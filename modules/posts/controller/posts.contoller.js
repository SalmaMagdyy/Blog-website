import postModel from '../../../DB/models/post.model.js';
export const addPost = async (req, res) => {
    let { title, content } = req.body;
    const addPost = await postModel({ title, content, createdBy: req.currentUserID }).populate('createdBy').populate('comments')
    const addedPost = await addPost.save();
    res.json({ message: "added", addedPost });
}

export const updatePost = async (req, res) => {
    let { postId } = req.params;
    let { title } = req.body;
    try {
    const updatePost = await postModel.findById(postId);
    console.log(updatePost);
    if (updatePost) {
        if (updatePost.createdBy.toString() == req.currentUserID.toString()) {
            const updatedPost = await postModel.findByIdAndUpdate(postId,{ title });
            console.log(title);
            res.json({ message: "updated", updatedPost });
        } else {
            res.json({ message: "you aren't owner to update this post" });
        }
    }
}  catch (error) {
    res.json({ message: "error", error });
}
}



export const getallPost = async (req, res) => {
    try {
        let getdata = await postModel.find({}).populate('createdBy').populate('comments')
        res.json({ message: "allposts", getdata });
        res.json({ message: "done" });
    } catch (err) {
        console.log(err);
        res.json({ message: "error" });
    }
}


export const getuserPost = async (req, res) => {
    const getuserPost = await postModel.find({ createdBy: req.currentUserID }).populate('createdBy').populate('comments');
    if (getuserPost) {
        console.log(getuserPost)
        res.json({ message: 'Done', getuserPost })
    } else {
        res.json({ message: ' not found' })

    }

}

export const deletePost = async (req, res) => {
    let { postId } = req.params;
    try {
        const deletePost = await postModel.findById(postId);
        if (deletePost) {
            if (deletePost.createdBy.toString() == req.currentUserID.toString()) {
                const deletedPost = await postModel.deleteOne({ postId });
                res.json({ message: "deleted", deletedPost });
            } else {
                res.json({ message: "you aren't owner to delete this post" });
            }
        }

    } catch (error) {
        res.json({ message: "not deleted", error });
    }
}

