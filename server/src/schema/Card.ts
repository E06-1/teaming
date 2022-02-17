
import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
    _id: String, //https://mongoosejs.com/docs/guide.html#_id ---> const schema = new Schema({ _id: Number }); should work, so i guess String as well.
    content:{
        type: String,
        required:false
    }
});

const Card = mongoose.model("Card", cardSchema)
export default Card;

/*

interface card {
id: `card:string`;
content: string;
}

*/