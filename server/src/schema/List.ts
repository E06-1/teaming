import { teaming } from "../../../types";
import mongoose from "mongoose";

const listSchema = new mongoose.Schema<teaming.List>({
  _id: String, //https://mongoosejs.com/docs/guide.html#_id ---> const schema = new Schema({ _id: Number }); should work, so i guess String as well.
  header: {
    type: String,
    required: true,
  },
  boardId: {
    type: String,
    required: true,
    index: true,
  },
  pos: {
    type: Number,
    required: true,
  },
});

const List = mongoose.model<teaming.List>("List", listSchema);
export default List;

/*
interface list {
id: `list:string`;
header: string;
cards: cardId[]
}

*/
