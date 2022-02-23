import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  users: {
    type: [String],
    required: true,
  },
  lists: {
    type: [String],
    required: false,
  },
  boards: {
    type: [String],
    required: false,
  },
  cards: {
    type: [String],
    required: false,
  },
});

const Session = mongoose.model("Session", sessionSchema);
export default Session;

/*
interface session{
users: user[]
lists: list[]
boards: board[]
cards: card[]
}
*/
