import {
  Box,
  List as MuiList,
  ListItem,
  ListItemButton,
  ListSubheader,
  Paper,
  Card,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/icons-material/Menu";
import Add from "@mui/icons-material/Add";
import React from "react";
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
          <Menu />
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
