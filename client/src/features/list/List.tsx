import MuiList from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Card from "../card/Card";
import Delete from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Add from "@mui/icons-material/Add";
import { v4 } from "uuid";
import type { teaming } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createCard, moveCardToList } from "../card/cardsSlice";
import {
  changeHeader,
  deleteList,
  selectCardIdsOnList,
  selectList,
  switchListPositions,
} from "./listsSlice";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier } from "dnd-core";
import { useEffect, useRef, useState } from "react";
import { pointerIsDeepInside } from "../../common/utils";
import { DnDTypes, DnDItems } from "../dnd/dndtypes";
import { allowDnd, denyDnd, selectIsDnDAllowed } from "../dnd/dndSlice";

interface ListProps {
  id: teaming.ListId;
}

function List({ id }: ListProps) {
  const dispatch = useAppDispatch();
  const { header, pos } = useAppSelector(selectList(id));
  const cards = useAppSelector(selectCardIdsOnList(id));
  const isDnDAllowed = useAppSelector(selectIsDnDAllowed);

  const [editing, setEditing] = useState(false);

  const handleCreateCard = () => {
    const cardId: teaming.CardId = `card:${v4()}`;
    dispatch(
      createCard({
        cardId,
        onListId: id,
        content: "new content",
      })
    );
  };

  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag<
    DnDItems.List,
    void,
    {
      isDragging: boolean;
    }
  >({
    type: DnDTypes.List,
    item: { id, fromPos: pos },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isDnDAllowed,
  });

  const [{ handlerId }, drop] = useDrop<
    DnDItems.List,
    void,
    { handlerId: Identifier | null }
  >({
    accept: DnDTypes.List,
    hover: (item, monitor) => {
      if (!monitor.canDrop()) return;
      if (!ref || !ref.current) return;
      if (pos === item.fromPos) return;
      if (item.id === id) return;
      const clientRect = ref.current.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      if (
        pointerIsDeepInside(
          { unit: "%", x: 10, y: 5 },
          clientRect,
          clientOffset
        )
      ) {
        dispatch(switchListPositions({ listId1: id, listId2: item.id }));
        item.fromPos = pos;
      }
    },
    collect: (monitor) => ({ handlerId: monitor.getHandlerId() }),
  });

  const [, dropCard] = useDrop<
    DnDItems.Card,
    void,
    { handlerId: Identifier | null }
  >({
    accept: DnDTypes.Card,
    hover: (item, monitor) => {
      if (!monitor.canDrop()) return;
      if (!ref || !ref.current) return;
      if (item.fromListId === id) return;
      const clientRect = ref.current.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      if (
        pointerIsDeepInside(
          { unit: "%", x: 10, y: 5 },
          clientRect,
          clientOffset
        )
      ) {
        dispatch(
          moveCardToList({
            cardId: item.id,
            toListId: id,
          })
        );
        item.fromListId = id;
      }
    },
  });

  const headerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!headerRef || !headerRef.current) return;
    const listener = (e: MouseEvent) => {
      console.log("target", e.target);
      console.log("current", headerRef.current);
      if (e.target !== headerRef.current) setEditing(false);
    };
    if (editing) {
      headerRef.current.focus();
      dispatch(denyDnd());
      window.addEventListener("mousedown", listener);
    } else {
      dispatch(allowDnd());
      if (headerRef.current.innerText !== header)
        dispatch(
          changeHeader({ listId: id, header: headerRef.current.innerText })
        );
      window.removeEventListener("mousedown", listener);
    }
    return () => window.removeEventListener("mousedown", listener);
  }, [editing, dispatch, header, id]);

  dropCard(drag(drop(ref)));
  return (
    <Paper
      elevation={1}
      className="List"
      sx={{ flexShrink: "0", opacity: isDragging ? "0" : "1" }}
      ref={ref}
      data-handler-id={handlerId}
    >
      <MuiList>
        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            whiteSpace: "nowrap",
          }}
        >
          <Typography
            contentEditable={editing}
            onDoubleClick={() => {
              setEditing(true);
              headerRef.current?.focus();
            }}
            onChange={(e) => console.log(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setEditing(false);
            }}
            ref={headerRef}
          >
            {header}
          </Typography>
          <IconButton
            aria-label="delete"
            onClick={() => dispatch(deleteList({ listId: id }))}
          >
            <Delete />
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
          <Typography>Add Card</Typography>
        </ListItemButton>
      </MuiList>
    </Paper>
  );
}

export default List;
