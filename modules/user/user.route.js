import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { changePassword, deleteAcc, signIn, signUp, updateAcc } from "./controller/user.controller.js";
const router = Router();

router.post("/signup",signUp)
router.post("/signin",signIn)
router.put('/chpass',auth(),changePassword)
router.put('/updateAcc',auth(),updateAcc)
router.delete('/deleteAcc',auth(),deleteAcc)



export default router;