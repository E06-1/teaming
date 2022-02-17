import MuiList from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListSubheader from "@mui/material/ListSubheader";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import ListItemIcon from "@mui/material/ListItemIcon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Add from "@mui/icons-material/Add";
import { v4 } from "uuid";
import type { teaming } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createCard } from "../card/cardSlice";
import { addCard, selectList } from "./listSlice";

interface ListProps {
  id: teaming.ListId;
}

function List({ id }: ListProps) {
  const dispatch = useAppDispatch();
  const { cards, header } = useAppSelector(selectList(id));

  const handleCreateCard = () => {
    const cardId: teaming.CardId = `card:${v4()}`;
    dispatch(createCard({ cardId, content: "new content" }));
    dispatch(addCard({ listId: id, cardId }));
  };
  return (
    <Paper elevation={1} className="List">
      <MuiList>
        <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
          <ListSubheader>{header}</ListSubheader>
          <IconButton aria-label="options">
            <MoreVertIcon />
          </IconButton>
        </ListItem>
        {cards.map((id) => (
          <ListItem key={id}>
            <Card>{id}</Card>
          </ListItem>
        ))}
        <ListItem>
          <ListItemButton onClick={handleCreateCard}>
            <ListItemIcon>
              <Add />
            </ListItemIcon>{" "}
            Add Card
          </ListItemButton>
        </ListItem>
      </MuiList>
    </Paper>
  );
}

export default List;
