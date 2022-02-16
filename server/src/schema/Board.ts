
import mongoose from 'mongoose';


const boardSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    lists:{
        type:[String],
        required:false
    },
    collaborators:{
        type:[String],
        required:false
    },
    admins:{
        type:[String],
        required:false
    }
});

const Board = mongoose.model("Board", boardSchema)
export default Board;

/*
interface board {
id: `board:string`
name: string
lists: listId[]
collaborators: userId[]
admins: userId[]
}

*/