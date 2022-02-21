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
import { changeList, createCard } from "../card/cardsSlice";
import { moveCardToList, selectList, selectListPosition } from "./listsSlice";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier } from "dnd-core";
import { moveListWithinBoard } from "../board/boardsSlice";
import { useRef } from "react";
import { pointerIsDeepInside } from "../../common/utils";
import { DnDTypes, DnDItems } from "../dnd/dndtypes";

interface ListProps {
  id: teaming.ListId;
}

function List({ id }: ListProps) {
  const dispatch = useAppDispatch();
  const { cards, header, boardId } = useAppSelector(selectList(id));
  const position = useAppSelector(selectListPosition(id));

  const handleCreateCard = () => {
    const cardId: teaming.CardId = `card:${v4()}`;
    dispatch(createCard({ cardId, onListId: id, content: "new content" }));
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
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
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
        dispatch(
          moveListWithinBoard({ boardId, listId: item.id, toPos: position })
        );
      }
    },
    collect: (monitor) => ({ handlerId: monitor.getHandlerId() }),
  });

  const [{}, dropCard] = useDrop<
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
            fromListId: item.fromListId,
            toListId: id,
            toPos: cards.length,
          })
        );

        dispatch(
          changeList({
            cardId: item.id,
            listId: id,
          })
        );
        item.fromListId = id;
      }
    },
  });

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
          <Typography>Add Card</Typography>
        </ListItemButton>
      </MuiList>
    </Paper>
  );
}

export default List;
