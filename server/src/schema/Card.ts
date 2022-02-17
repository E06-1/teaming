
import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
    
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