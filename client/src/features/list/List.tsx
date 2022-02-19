import MuiList from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Card from "../card/Card";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Add from "@mui/icons-material/Add";
import { v4 } from "uuid";
import type { teaming } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createCard } from "../card/cardsSlice";
import { selectList } from "./listsSlice";

interface ListProps {
  id: teaming.ListId;
}

function List({ id }: ListProps) {
  const dispatch = useAppDispatch();
  const { cards, header } = useAppSelector(selectList(id));

  const handleCreateCard = () => {
    const cardId: teaming.CardId = `card:${v4()}`;
    dispatch(createCard({ cardId, onListId: id, content: "new content" }));
  };
  return (
    <Paper elevation={1} className="List" sx={{ flexShrink: "0" }}>
      <MuiList>
        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            whiteSpace: "nowrap",
          }}
        >
          <Typography>{header}</Typography>
          <IconButton aria-label="options">
            <MoreVertIcon />
          </IconButton>
        </ListItem>
        {cards.map((id) => (
          <ListItem key={id}>
            <Card id={id} />
          </ListItem>
        ))}
        <ListItemButton
          onClick={handleCreateCard}
          sx={{
            display: "flex",
            whiteSpace: "nowrap",
            flexWrap: "nowrap",
            alignItems: "center",
          }}
        >
          <Add />
          Add Card
        </ListItemButton>
      </MuiList>
    </Paper>
  );
}

export default List;
