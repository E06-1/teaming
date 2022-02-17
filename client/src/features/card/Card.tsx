import type { teaming } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeContent, deleteCard, selectCard } from "./cardSlice";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import EditOffIcon from "@mui/icons-material/EditOff";
import CheckIcon from "@mui/icons-material/Check";
import TextField from "@mui/material/TextField";

interface CardProps {
  id: teaming.CardId;
}

function Card({ id }: CardProps) {
  const { content } = useAppSelector(selectCard(id));
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content); 
  const dispatch = useAppDispatch();

  // dispatch(changeContent({ cardId: id, content: "" }));
  // dispatch(deleteCard({ cardId: id }));
  const handleSave = () => {
    dispatch(changeContent({ cardId: id, content: editedContent }));
    setEditing(false)
  };

  return (
    <MuiCard className="Card">
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {editing ? (
          <>
            <TextField
              value={editedContent} 
              onChange={(e) => {
                setEditedContent(e.target.value); 
              }}
              size="small"
              sx={{ width: "max-content"}}
            />
            <Box>
              <IconButton onClick={handleSave} aria-label="save">
                <CheckIcon />
              </IconButton>
              <IconButton onClick={() => setEditing(false)} aria-label="cancel">
                <EditOffIcon />
              </IconButton>
            </Box>
          </>
        ) : (
          <>
          <Typography variant="body2" > 
            {content}
            </Typography> 
            <Box>
              <IconButton onClick={() => setEditing(true)} aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => dispatch(deleteCard({ cardId: id }))}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </>
        )}
      </CardContent>
    </MuiCard>
  );
}

// const styles ={
//     cardContainer: {
//         marginBottom: 8
//     }
// };

export default Card;
