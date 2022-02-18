
import mongoose from 'mongoose';


const boardSchema = new mongoose.Schema({
    _id: String, //https://mongoosejs.com/docs/guide.html#_id ---> const schema = new Schema({ _id: Number }); should work, so i guess String as well.
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