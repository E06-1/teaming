import express from "express";
import User from "../schema/User";
import crypto from "crypto";
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

// create one
loginRouter.post("/", async (req:express.Request, res:express.Response) => {
  const hash = crypto.createHash("md5").update(req.body.password).digest("hex");
    try {
      const user = await User.find({email:req.body.email});
      if(user !== []){
        if(user[0]?.password === hash){
          res.json(user)
        }else{
          res.status(500).json({message: "Password is not correct!!!"})
        }
        
      }
     // res.json(user)

    } catch (error:any) {
      return res.status(500).json({ message: error.message });
    }
});
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