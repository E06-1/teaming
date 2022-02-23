import { Types } from "mongoose";

export namespace teaming {
  type UserId = Types.ObjectId;
  type ListId = `list:${string}`;
  type BoardId = `board:${string}`;
  type CardId = `card:${string}`;

  interface User {
    _id: UserId;
    avatar: string;
    username: string;
    email: string;
    password: string;
  }

  interface List {
    _id: ListId;
    header: string;
    boardId: BoardId;
    pos: number;
  }

  interface Board {
    _id: BoardId;
    name: string;
    collaborators: UserId[];
    admins: UserId[];
  }

  interface Card {
    _id: CardId;
    content: string;
    listId: ListId;
    pos: number;
  }
}
