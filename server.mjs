import express, { response } from "express"
import path from "path"
// import cors from "cors"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose"
import cookieParser from 'cookie-parser'
const app = express()
const __dirname = path.resolve()
const mongodbURI =  process.env.mongodbURI || "mongodb+srv://muhammadhamdali572:hamdali99332@cluster0.g7j5dka.mongodb.net/userdatabase?retryWrites=true&w=majority";
import cors from "cors"
import axios from "axios"
const SECRET = process.env.SECRET || "topsecret";
import authRoute from "./src/routes/authroute.mjs"
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000', "https://muhammadhamd.up.railway.app", "*","https://geocode.maps.co/"],
    credentials: true
}));





function authenticateUser(req, res, next) {
    const token = req.cookies.Token; // Assuming you store the token in a cookie
    if (token) {
      // Verify and decode the token here (use your actual logic)
      // For example, you can use the 'jsonwebtoken' library
      const decodedData = jwt.verify(token, SECRET);
  
      if (decodedData) {
        // If the token is valid, set the user data in the request object
        req.body.decodedData = decodedData;
      }
    }
    next();
  }


  app.use("/api/auth/",authRoute)


app.get("/reverseapi",async(req,res)=>{

    const apiUrl = `https://geocode.maps.co/reverse?lat=24.90368
    &lon=67.0957568&api_key=65fa81fc79c33825484020zinf8a1d4`;
     axios.get(apiUrl)
     .then((response)=>{
      console.log(response)
    res.send(response);
     })
     .catch((err)=>{
      console.log(err)
     })
  
})
app.use(express.static(path.join(__dirname, 'web/build')))
app.use(('/'),express.static(path.join(__dirname, 'web/build')))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'web/build/index.html'));
  });







const PORT = process.env.PORT || 2344
app.listen(PORT,()=>{
    console.log(PORT)
})
mongoose.connect(mongodbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});