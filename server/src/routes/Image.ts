import express, { Request } from "express";
import path from "path";
import fs from "fs/promises";
const imageRouter = express.Router();

imageRouter.get("/random", async (req:express.Request, res:express.Response) => {
  const imageUrls = await getImageUrls(req);
  const randomIndex = Math.floor(Math.random()* imageUrls.length)
  const image = imageUrls[randomIndex]
  res.send(image) 
  // try {
  //   const image = await Image();
  //   res.json(image);
  // } catch (error: any) {
  //   res.status(500).json({ message: error.message });
  // }
}); 

//Call this function in your route handler to retrieve the image urls
//const imageUrls = await getImageUrls(req);
//Returns a promise, once resolved it contains an array with Urls to our Images
async function getImageUrls(req: Request) {
  const imagePath = path.resolve(__dirname, "../../static/images");
  const uri = req.protocol + "://" + req.get("host") + "/images/";
  const filenames = await fs.readdir(imagePath);
  return filenames.map((name) => uri + name);
}

export default imageRouter; 