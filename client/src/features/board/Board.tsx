import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useDrop } from "react-dnd";
import { v4 } from "uuid";
import type { teaming } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import List from "../list/List";
import { createList } from "../list/listsSlice";
import { selectBoard, selectListIdsOnBoard } from "./boardsSlice";
import { useState } from "react";
import axios from "axios";
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
  const [image, setImage] = useState("");
  useEffect(() => {
    axios.get("/image/random").then((res) => {
      console.log(res.data);
      setImage(res.data);
    });
  }, []);

  return (
    <Box
      sx={{ backgroundImage: image, position: "relative" }}
      className="Board"
      ref={drop}
    >
      <h2>{name}</h2>
      {image ? (
        <img
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            left: "0",
            bottom: "0",
            zIndex: "-1",
            objectFit: "cover",
            display: "block",
            width:"100%",
            height:"100%"
          }} 
          src={image}
        />
      ) : null}
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
