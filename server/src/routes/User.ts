import express from "express";
import User from "../schema/User";
import crypto from "crypto";
import "dotenv/config";
import { Model } from "mongoose";
const userRouter = express.Router();

// get all
userRouter.get("/", async (req:express.Request, res:express.Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// create one
userRouter.post("/", async (req:express.Request, res:express.Response) => {
  const hash = crypto.createHash("md5").update(req.body.password).digest("hex");
  const usr = new User({
    username: req.body.username,
    email: req.body.email,
    password: hash,
    avatar: req.body.avatar,
  });
  try {
    const newUser = await usr.save();
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error });
  }
});

// get one by id
userRouter.get("/:id", async (req:express.Request, res:express.Response) => {
  let user: Model<any> | null = null;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find the user !" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
  res.json(user);
});

//delete
userRouter.delete("/:id", async (req:express.Request, res:express.Response) => {
  let result = null;

  result = await User.findByIdAndDelete(req.params.id);

  if (result == null) {
    return res.status(404).json({ message: "Cannot find the user !" });
  }
  res.json({ message: result });
});

// update one
userRouter.patch('/:id', async( req:express.Request,res:express.Response)=>{

    let result = null;
    result = await User.findByIdAndUpdate(req.params.id, req.body)
    if (result == null) {
        return res.status(404).json({ message: "Cannot find the user !" });
      }
    res.json({message: result})

})
export default userRouter;


/*
interface user {
id: `user:string`;
avatar: imgUrl;
email: string, unique
username: string;
password: string;
}

*/