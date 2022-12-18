import { Router } from "express";
import { addComment, deleteComment, updateComment } from "./controller/comments.controller.js";
const router = Router();
 import { auth } from "../../middleware/auth.js";


 router.post("/addcomm/:id",auth(),addComment)
 router.put("/updatecomm/:postId/:id",auth(),updateComment)
 router.delete("/deletecomm/:postId/:id",deleteComment)
export default router;
