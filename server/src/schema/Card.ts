import { teaming } from "../../../types";
import mongoose from "mongoose";

const cardSchema = new mongoose.Schema<teaming.Card>({
  _id: String, //https://mongoosejs.com/docs/guide.html#_id ---> const schema = new Schema({ _id: Number }); should work, so i guess String as well.
  content: {
    type: String,
    required: false,
  },
  listId: {
    type: String,
    required: true,
    index: true,
  },
  pos: {
    type: Number,
    required: false,
  },
});

const Card = mongoose.model<teaming.Card>("Card", cardSchema);
export default Card;

/*

interface card {
id: `card:string`;
content: string;
}

*/
