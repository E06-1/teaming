import { teaming } from "../../../types";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<teaming.User>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
});

const User = mongoose.model<teaming.User>("User", userSchema);
export default User;

/*

interface user {
id: `user:string`;
username: string;
email: string unique = ! added
password: string;
avatar: imgUrl;
}

*/
