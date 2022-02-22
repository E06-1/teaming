import type { teaming } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  changeContent,
  changeList,
  deleteCard,
  selectCard,
  selectCardPosition,
} from "./cardsSlice";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import EditOffIcon from "@mui/icons-material/EditOff";
import CheckIcon from "@mui/icons-material/Check";
import TextField from "@mui/material/TextField";
import { useDrag, useDrop } from "react-dnd";
import { Identifier } from "dnd-core";
import { DnDTypes, DnDItems } from "../dnd/dndtypes";
import { pointerIsDeepInside } from "../../common/utils";
import { moveCardToList } from "../list/listsSlice";

interface CardProps {
  id: teaming.CardId;
}

function Card({ id }: CardProps) {
  const { content, listId } = useAppSelector(selectCard(id));
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const dispatch = useAppDispatch();
  const position = useAppSelector(selectCardPosition(id));
  //const [currentItem, setCurrentItem]= useState(" "); 

  // dispatch(changeContent({ cardId: id, content: "" }));
  // dispatch(deleteCard({ cardId: id }));
  const handleSave = () => {
    dispatch(changeContent({ cardId: id, content: editedContent }));
    setEditing(false);
  };

  const handleCancel =()=> {
     setEditing(false)
     setEditedContent(content)
  } 

  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag<
    DnDItems.Card,
    void,
    { isDragging: boolean }
  >({
    type: DnDTypes.Card,
    item: { id, fromListId: listId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    isDragging: (monitor) => monitor.getItem().id === id,
  });

  const [{ handlerId }, drop] = useDrop<
    DnDItems.Card,
    void,
    { handlerId: Identifier | null }
  >({
    accept: DnDTypes.Card,
    hover: (item, monitor) => {
      if (!monitor.canDrop()) return;
      if (!ref || !ref.current) return;
      if (item.id === id) return;
      const clientRect = ref.current.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      if (
        pointerIsDeepInside({ unit: "%", x: 2, y: 2 }, clientRect, clientOffset)
      ) {
        dispatch(
          moveCardToList({
            cardId: item.id,
            fromListId: item.fromListId,
            toListId: listId,
            toPos: position,
          })
        );

        dispatch(
          changeList({
            cardId: item.id,
            listId: listId,
          })
        );
        item.fromListId = listId;
      }
    },
    collect: (monitor) => ({ handlerId: monitor.getHandlerId() }),
  });

  drag(drop(ref));

  return (
    <MuiCard
      className="Card"
      ref={ref}
      sx={{ opacity: isDragging ? "0" : "1" }}
      data-handler-id={handlerId}
    >
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
              sx={{ width: "max-content" }}
            />
            <Box>
              <IconButton onClick={handleSave} aria-label="save">
                <CheckIcon />
              </IconButton>
              <IconButton onClick={handleCancel} aria-label="cancel">
                <EditOffIcon /> 
              </IconButton>  
            </Box>
          </>
        ) : (
          <>
            <Typography variant="body2">{content}</Typography>
            <Box>
              <IconButton onClick={() => setEditing(true)} aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() =>
                  dispatch(deleteCard({ cardId: id, fromListId: listId }))
                }
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
