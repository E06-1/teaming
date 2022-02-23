import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useDrop } from "react-dnd";
import { v4 } from "uuid";
import type { teaming } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import List from "../list/List";
import { createList } from "../list/listsSlice";
import { selectBoard, selectListIdsOnBoard } from "./boardsSlice";

interface BoardProps {
  id: teaming.BoardId;
}

function Board({ id }: BoardProps) {
  const dispatch = useAppDispatch();
  const { name, collaborators } = useAppSelector(selectBoard(id));
  const lists = useAppSelector(selectListIdsOnBoard(id));

  const handleCreateList = () => {
    const listId: teaming.ListId = `list:${v4()}`;
    dispatch(createList({ listId, onBoardId: id, header: "new" }));
  };

  const [, drop] = useDrop({
    accept: "list",
  });

  return (
    <Box sx={{ backgroundColor: "primary.main" }} className="Board" ref={drop}>
      <h2>{name}</h2>
      <Container sx={{ display: "flex", gap: "1rem" }}>
        {lists.map((id) => (
          <List key={id} id={id} />
        ))}
        <input type="button" value="Create List" onClick={handleCreateList} />
      </Container>
    </Box>
  );
}

export default Board;
