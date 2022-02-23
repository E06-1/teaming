import express from "express";
import User from "../schema/User";
import crypto from "crypto";
import jwt from 'jsonwebtoken'
import "dotenv/config";
import { Model } from "mongoose";
import userRouter from "./User";
const loginRouter = express.Router();

// // get all
// userRouter.get("/", async (req:express.Request, res:express.Response) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// });

  const AT:any = process.env.ACCESS_TOKEN
  const RT:any = process.env.REFRESH_TOKEN

const authenticateToken = (req:any, res:express.Response, next:any) =>{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token=== null) return res.status(401);
  
  jwt.verify(token,AT,(err:any, user:any)=>{
  if(err) return res.sendStatus(403);
  req.user = user;
  console.log('user = ',user)
  next();
  })
}
const generateAccessToken = (user:any)=>
jwt.sign({name:user},AT)//, {expiresIn: 60*20} )
// create one
loginRouter.post("/", async (req:express.Request, res:express.Response) => {
  const hash = crypto.createHash("md5").update(req.body.password).digest("hex");


  let refresh_tokens: string[] = []



    try {
      const user = await User.find({email:req.body.email});
      if(user.length >0){
        if(user[0]?.password === hash){

          // user correct  generate acc token
          const em = req.body.email;
          const accToken = generateAccessToken(em)
          const refToken = jwt.sign(em, RT);
          res.json({accessToken: accToken})//, refreshToken: refToken})
          //res.json(user)
        }else{
          res.status(500).json({message: "Password is not correct!!!"})
        }
      }
     // res.json(user)

    } catch (error:any) {
      return res.status(500).json({ message: error.message });
    }
});

// get user
loginRouter.get("/", authenticateToken, async (req:any, res:express.Response)=>{
  try {
    const user = await User.find({email:req.user.name})
    if(user.length >0){
        res.json({user: user})
        //res.json(user)
    }
  } catch (error) {
    res.status(500).json({message: "User not found !!!"})
  }
} )




export default loginRouter;


/*
interface user {
id: `user:string`;
avatar: imgUrl;
email: string, unique
username: string;
password: string;
}

*/