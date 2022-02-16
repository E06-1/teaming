
import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
    header:{
        type: String,
        required:true
    },
    cards:{
        type:[String],
        required:false
    }
});

const List = mongoose.model("List", listSchema)
export default List;

/*
interface list {
id: `list:string`;
header: string;
cards: cardId[]
}

*/