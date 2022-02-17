import express from "express";
import List from "../schema/List";
import Card from "../schema/Card";
import { Model } from "mongoose";
const listRouter = express.Router();

// get all
listRouter.get("/", async (req:express.Request, res:express.Response) => {
  try {
    const list = await List.find();
    res.json(list);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// create one
listRouter.post("/", async (req:express.Request, res:express.Response) => {
 const list = new List({
   _id: req.body.id,
    header: req.body.header,
    cards: req.body.cards
  });
  try {
    const newList = await list.save();
    res.status(201).json(newList);
  } catch (error: any) {
    res.status(400).json({ message: error });
  }
});

// get one by id
listRouter.get("/:id", async (req:express.Request, res:express.Response) => {
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
listRouter.delete("/:id", async (req:express.Request, res:express.Response) => {
  let result = null;

  result = await List.findByIdAndDelete(req.params.id);

  if (result == null) {
    return res.status(404).json({ message: "Cannot find the list !" });
  }
  res.json({ message: result });
});

// update one
listRouter.patch('/:id', async( req:express.Request,res:express.Response)=>{

    let result = null;
    result = await List.findByIdAndUpdate(req.params.id, req.body)
    if (result == null) {
        return res.status(404).json({ message: "Cannot find the list !" });
      }
    res.json({message: result})

})
export default listRouter;


/*
 interface List {
    id: ListId;
    header: string;
    cards: CardId[];
  }
*/