
import express from 'express';
import User from '../schema/User';
import crypto from 'crypto';
import 'dotenv/config';
const KEY="some key"
const userRouter = express.Router();

// get all
userRouter.get('/', async (req,res)=>{
    try {
        const users = await User.find();
        res.json(users);
    } catch (error:any) {
                res.status(500).json({message: error.message})
    }
});

// create one
userRouter.post("/", async (req,res)=>{
    const hash = crypto.createHash('md5').update(req.body.password).digest('hex');
    const usr = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        avatar: req.body.avatar
    });
    try {
        const newUser = await usr.save();
        res.status(201).json(newUser);
    } catch (error:any) {
        res.status(400).json({message: error})
    }
});

// get one by id
userRouter.get('/:id', (req,res)=>{

} )

//delete
userRouter.delete("/:id", async(req,res)=>{

});

const getUser = async (req:any,res:any , next:any ) =>{
    let user = null;
    try {
        user = await User.findById(req.pa)
    } catch (error) {
        
    }
}
export default userRouter;