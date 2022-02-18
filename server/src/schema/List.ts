
import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
    _id: String, //https://mongoosejs.com/docs/guide.html#_id ---> const schema = new Schema({ _id: Number }); should work, so i guess String as well.
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