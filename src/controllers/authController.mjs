import {client} from "../../mongodb.mjs"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import app from '../../firebaseconfig.mjs'
import {  getStorage, ref, uploadBytes , getDownloadURL  } from "firebase/storage";
import userModels from "../models/usermodels.mjs";
const SECRET = "hamd bhai"
const db = client.db("ridebook")

export const RegisterUser = async(req,res)=>{

  try {
    console.log("fa")
    const {name,email,password,role,lat,long} =req.body

    
    const addImgDB = req?.file
    let imgUrl = ''
    const user = await userModels.findUserByEmail(email);
    if (user) {
      res.status(400).send({
        mesage:"user already exists",

      })
      return
    }


    if (addImgDB) {
      const name = +new Date() + "-" + addImgDB.originalname;
      const metadata = {
       contentType: addImgDB.mimetype
      };
      const storageRef = ref(getStorage(app), name)
      
      const task = uploadBytes(storageRef, addImgDB.buffer, metadata);
      
      
      const snapshot = await task
      
      imgUrl =await getDownloadURL(snapshot.ref)
            
     }
     const hashedPassword = await bcrypt.hash(password, 10)
    const registerUser = await db.collection("users").insertOne({
      name,
      email,
      password:hashedPassword,
      role,
      lat,
      long,
      profileImage:imgUrl,
  
    })
    const data = await userModels.findUserByEmail(email)
    if (!data) {
      res.status(400).send({
        message:"error while registration",
        sucess:false
      })
      return
    }

    const token = jwt.sign({
      _id: data._id,
      email: data.email,
      name:data.name,
      image:data.profileImage,
      role,
      iat: Date.now() / 1000 - 30,
      exp: Date.now() / 1000 + (60 * 60 * 24),
    }, SECRET);

    res.cookie('Token', token, {
      maxAge: 86_400_000,
      httpOnly: true,
    });

    res.send({
      message:"registerd sucess",
      sucess:true,
      user:data

    })
  } catch (error) {
   res.status(500).send(error)
   console.log(error) 
  }
  
} 
export const getToken = async(req,res)=>{

  try {

    const data = req.body.decodedData
    res.send({
      message:"registerd sucess",
      sucess:true,
      user:data

    })
  } catch (error) {
   res.status(500).send(error)
   console.log(error) 
  }
  
} 