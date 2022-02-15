export namespace teaming {
    
  type UserId = `user:${string}`;
  type ListId = `list:${string}`;
  type BoardId = `board:${string}`;
  type CardId = `card:${string}`;

  interface User {
    id: UserId;
    avatar: string;
    username: string;
    password: string;
  }

  interface List {
    id: ListId;
    header: string;
    cards: CardId[];
  }

  interface Board {
    id: BoardId;
    name: string;
    lists: ListId[];
    collaborators: UserId[];
    admins: UserId[];
  }

  interface Card {
    id: CardId;
    content: string;
  }
}
