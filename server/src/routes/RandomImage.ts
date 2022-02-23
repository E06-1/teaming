import express, { Request } from "express";
import path from "path";
import fs from "fs/promises";

//Call this function in your route handler to retrieve the image urls
//const imageUrls = await getImageUrls(req);
//Returns a promise, once resolved it contains an array with Urls to our Images
async function getImageUrls(req: Request) {
  const imagePath = path.resolve(__dirname, "../../static/images");
  const uri = req.protocol + "://" + req.get("host") + "/images/";
  const filenames = await fs.readdir(imagePath);
  return filenames.map((name) => uri + name);
}
