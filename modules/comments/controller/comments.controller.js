import commentModel from '../../../DB/models/comment.model.js';
import postModel from '../../../DB/models/post.model.js';


export const addComment= async (req,res) =>{
  let{id}=req.params;      
  let{content}=req.body;
  console.log(content);
    const comment = await commentModel({content,createdBy:req.currentUserID,postId:id});
    const addcomment=await comment.save();
    console.log(addcomment);
   const data=await postModel.findOneAndUpdate({_id:id},
      { $push :{ comments: comment}})
      console.log(data);
      console.log(comment);
      res.json({message:"Comment added successfully",addcomment});
} 


export const updateComment=async(req,res)=>{
  let{postId,id}=req.params;
  let{content}=req.body;
  const updateComment=await commentModel.findOneAndUpdate({postId,id,content});
  console.log(updateComment);
  res.json({message:"updated",updateComment});
}


    
export const deleteComment=async(req,res)=>{
  let{postId,id}=req.params;
    try {
      const post = await postModel.findByIdAndUpdate(
        postId,
        {
          $pull: { comments: id },
        },
        { new: true }
      );
  
      if (!post) {
        return res.json("Post not found");
      }
  
      await commentModel.findByIdAndDelete(id);
  
      res.json("Success");
    } catch (err) {
      console.log(err);
      res.json("Something went wrong");
    }
  };