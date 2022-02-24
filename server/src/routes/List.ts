import express from "express";
import List from "../schema/List";
import Card from "../schema/Card";
import { Model } from "mongoose";
import { authorize } from "./Login";
import Board from "../schema/Board";
const listRouter = express.Router();

// get all
listRouter.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const list = await List.find();
    res.json(list);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// create one
listRouter.post("/", async (req: express.Request, res: express.Response) => {
  try {
    const user = authorize(req);
    const board = await Board.findById(req.body.boardId);
    console.log("user", user);
    console.log("board", board);

    if (!board || !board.collaborators.includes(user._id))
      return res.sendStatus(409);
    const list = new List({
      _id: req.body._id,
      header: req.body.header,
      boardId: req.body.boardId,
      pos: req.body.pos,
    });
    const newList = await list.save();
    res.status(201).json(newList);
  } catch (error: any) {
    res.status(400).json({ message: error });
  }
});

// get one by id
listRouter.get("/:id", async (req: express.Request, res: express.Response) => {
  let list: Model<any> | null = null;
  try {
    list = await List.findById(req.params.id);
    if (list == null) {
      return res.status(404).json({ message: "Cannot find the list !" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
  res.json(list);
});

//delete
listRouter.delete(
  "/:id",
  async (req: express.Request, res: express.Response) => {
    let result = null;

    result = await List.findByIdAndDelete(req.params.id);

    if (result == null) {
      return res.status(404).json({ message: "Cannot find the list !" });
    }
    res.json({ message: result });
  }
);

// update one
listRouter.patch(
  "/:id",
  async (req: express.Request, res: express.Response) => {
    let result = null;
    result = await List.findByIdAndUpdate(req.params.id, req.body);
    if (result == null) {
      return res.status(404).json({ message: "Cannot find the list !" });
    }
    res.json({ message: result });
  }
);
export default listRouter;

/*
 interface List {
    id: ListId;
    header: string;
    cards: CardId[];
  }
*/
