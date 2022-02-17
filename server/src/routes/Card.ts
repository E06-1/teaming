import express from "express";
import Card from "../schema/Card";
import { Model } from "mongoose";
const cardRouter = express.Router();

// get all
cardRouter.get("/", async (req:express.Request, res:express.Response) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// create one
cardRouter.post("/", async (req:express.Request, res:express.Response) => {
 const cards = new Card({
   _id: req.body.id,
    content: req.body.content,
  });
  try {
    const newCard = await cards.save();
    res.status(201).json(newCard);
  } catch (error: any) {
    res.status(400).json({ message: error });
  }
});

// get one by id
cardRouter.get("/:id", async (req:express.Request, res:express.Response) => {
  let cards: Model<any> | null = null;
  try {
    cards = await Card.findById(req.params.id);
    if (cards == null) {
      return res.status(404).json({ message: "Cannot find the card !" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
  res.json(cards);
});

//delete
cardRouter.delete("/:id", async (req:express.Request, res:express.Response) => {
  let result = null;

  result = await Card.findByIdAndDelete(req.params.id);

  if (result == null) {
    return res.status(404).json({ message: "Cannot find the card !" });
  }
  res.json({ message: result });
});

// update one
cardRouter.patch('/:id', async( req:express.Request,res:express.Response)=>{

    let result = null;
    result = await Card.findByIdAndUpdate(req.params.id, req.body)
    if (result == null) {
        return res.status(404).json({ message: "Cannot find the card !" });
      }
    res.json({message: result})

})
export default cardRouter;


/*
interface card {
id: `card:string`;
content: string;
}

*/