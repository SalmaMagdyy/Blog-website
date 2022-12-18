import { Router } from "express";
import { addPost, deletePost, getallPost, getuserPost, updatePost } from "./controller/posts.contoller.js";
import { auth } from "../../middleware/auth.js";

const router = Router();

router.post("/addpost",auth(),addPost)
router.put("/updatepost/:postId",auth(),updatePost)
router.get("/getallPost",getallPost)
router.get("/getuserPost",auth(),getuserPost)
router.delete("/deletePost/:postId",auth(),deletePost)

export default router;
