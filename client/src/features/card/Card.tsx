
import type { teaming } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeContent, deleteCard, selectCard } from "./cardSlice";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card"; 
import CardContent from "@mui/material/CardContent";  
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'; 
import  { useState } from "react"; 

interface CardProps {
  id: teaming.CardId;
}

function Card({ id }: CardProps) {
  const [editing, setEditing]= useState(); 
 const dispatch = useAppDispatch();  
 // const { content } = useAppSelector(selectCard(id)); 
  // dispatch(changeContent({ cardId: id, content: "" }));
  // dispatch(deleteCard({ cardId: id })); 

  return (
    <div className="Card">
    <MuiCard > 
        <CardContent> 
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton> 
      </CardContent> 
      </MuiCard> 
    </div>
  );
} 

// const styles ={
//     cardContainer: {
//         marginBottom: 8
//     }
// }; 

export default Card;
