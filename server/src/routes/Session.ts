import express from "express";
import { Model } from "mongoose";
import Session from "../schema/Session";
const sessionRouter = express.Router();

// get all
sessionRouter.get("/", async (req:express.Request, res:express.Response) => {
  try {
    const board = await Session.find();
    res.json(board);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// create one
sessionRouter.post("/", async (req:express.Request, res:express.Response) => {
 const session = new Session({
   _id: req.body.id,
    users: req.body.users,
    lists: req.body.lists,
    boards: req.body.boards,
    cards: req.body.cards
  });
  try {
    const newSession = await session.save();
    res.status(201).json(newSession);
  } catch (error: any) {
    res.status(400).json({ message: error });
  }
});

// get one by id
sessionRouter.get("/:id", async (req:express.Request, res:express.Response) => {
  let session: Model<any> | null = null;
  try {
    session = await Session.findById(req.params.id);
    if (session == null) {
      return res.status(404).json({ message: "Cannot find the session !" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
  res.json(session);
});

//delete
sessionRouter.delete("/:id", async (req:express.Request, res:express.Response) => {
  let result = null;

  result = await Session.findByIdAndDelete(req.params.id);

  if (result == null) {
    return res.status(404).json({ message: "Cannot find the session !" });
  }
  res.json({ message: result });
});

// update one
sessionRouter.patch('/:id', async( req:express.Request,res:express.Response)=>{

    let result = null;
    result = await Session.findByIdAndUpdate(req.params.id, req.body)
    if (result == null) {
        return res.status(404).json({ message: "Cannot find the session !" });
      }
    res.json({message: result})

})
export default sessionRouter;


/*
interface session{
users: user[]
lists: list[]
boards: board[]
cards: card[]
}
*/