import express from "express";
import { Model } from "mongoose";
import Board from "../schema/Board";
const boardRouter = express.Router();

// get all
boardRouter.get("/", async (req:express.Request, res:express.Response) => {
  try {
    const board = await Board.find();
    res.json(board);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// create one
boardRouter.post("/", async (req:express.Request, res:express.Response) => {
 const list = new Board({
   _id: req.body.id,
    name: req.body.name,
    lists: req.body.lists,
    collaborators: req.body.collaborators,
    admins: req.body.admins
  });
  try {
    const newList = await list.save();
    res.status(201).json(newList);
  } catch (error: any) {
    res.status(400).json({ message: error });
  }
});

// get one by id
boardRouter.get("/:id", async (req:express.Request, res:express.Response) => {
  let board: Model<any> | null = null;
  try {
    board = await Board.findById(req.params.id);
    if (board == null) {
      return res.status(404).json({ message: "Cannot find the board !" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
  res.json(board);
});

//delete
boardRouter.delete("/:id", async (req:express.Request, res:express.Response) => {
  let result = null;

  result = await Board.findByIdAndDelete(req.params.id);

  if (result == null) {
    return res.status(404).json({ message: "Cannot find the board !" });
  }
  res.json({ message: result });
});

// update one
boardRouter.patch('/:id', async( req:express.Request,res:express.Response)=>{

    let result = null;
    result = await Board.findByIdAndUpdate(req.params.id, req.body)
    if (result == null) {
        return res.status(404).json({ message: "Cannot find the board !" });
      }
    res.json({message: result})

})
export default boardRouter;


/*
interface board {
id: `board:string`
name: string
lists: listId[]
collaborators: userId[]
admins: userId[]
}
*/