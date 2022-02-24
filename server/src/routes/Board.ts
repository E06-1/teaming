import express from "express";
import jwt from "jsonwebtoken";
import { Model } from "mongoose";
import { teaming } from "../../../types";
import Board from "../schema/Board";
const boardRouter = express.Router();

// get all
boardRouter.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const board = await Board.find();
    res.json(board);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// create one
boardRouter.post("/", async (req: express.Request, res: express.Response) => {
  if (!process.env.SECRET_KEY) throw new Error("Unable to get key from .env");
  const auth = req.get("Authorization");

  if (!auth) return res.sendStatus(400);
  const [type, token] = auth.split(" ");
  if (type !== "bearer") return res.sendStatus(400);
  try {
    const user = jwt.verify(token, process.env.SECRET_KEY) as teaming.User;
    const list = new Board({
      _id: req.body._id,
      name: req.body.name,
      collaborators: [user._id],
      admins: [user._id],
    });
    const newList = await list.save();
    res.status(201).json(newList.toObject());
  } catch (error: any) {
    res.status(400).json({ message: error });
  }
});

// get one by id
boardRouter.get("/:id", async (req: express.Request, res: express.Response) => {
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
boardRouter.delete(
  "/:id",
  async (req: express.Request, res: express.Response) => {
    let result = null;

    result = await Board.findByIdAndDelete(req.params.id);

    if (result == null) {
      return res.status(404).json({ message: "Cannot find the board !" });
    }
    res.json({ message: result });
  }
);

// update one
boardRouter.patch(
  "/:id",
  async (req: express.Request, res: express.Response) => {
    let result = null;
    result = await Board.findByIdAndUpdate(req.params.id, req.body);
    if (result == null) {
      return res.status(404).json({ message: "Cannot find the board !" });
    }
    res.json({ message: result });
  }
);
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
