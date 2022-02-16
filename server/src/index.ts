//const express = require('express');
import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import userRouter from './routes/User';

const app = express();
app.use(cors())
app.use(express.json());

const PORT = process.env.SERVER_PORT || 5555;
const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/teaming_loc'

app.get('/', (req,res)=>{
    res.send(`<h2>${DB_URL}</h2>`)
})


// connect to db
mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on('error',(err:any)=>console.error(err));
db.once('open',()=>console.log('connected to MongoDB'));


// routes

app.use('/user',userRouter)





app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`));








