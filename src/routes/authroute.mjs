import express from "express"
import {client } from "../../mongodb.mjs"
import {RegisterUser, getToken} from "../controllers/authController.mjs"
import multer from 'multer';
import authenticateUser from "../middlewares/authmiddleware.mjs";
 
// const Usermodel = mongoose.model('Users', userSchema);
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit (adjust as needed)
  },
});
const router = express.Router()

router.post("/userregister",upload.single('ProfileImage'),RegisterUser)
router.get("/Token",authenticateUser,getToken)

export default router
