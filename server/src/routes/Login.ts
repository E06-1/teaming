import express from "express";
import User from "../schema/User";
import crypto from "crypto";
import "dotenv/config";
import jwt from "jsonwebtoken";

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
loginRouter.post("/", async (req: express.Request, res: express.Response) => {
  const hash = crypto.createHash("md5").update(req.body.password).digest("hex");
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: hash,
    }).exec();
    if (!user) return res.sendStatus(401);
    if (!process.env.SECRET_KEY) throw new Error("Unable to get key from .env");
    res.json(jwt.sign(user.toObject(), process.env.SECRET_KEY));
  } catch (error: any) {
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
