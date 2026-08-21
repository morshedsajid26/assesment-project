export interface User {
  _id: string;
  name: string;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LastMessage {
  text?: string;
  sender?: string | User;
  createdAt?: string;
}

export interface Conversation {
  _id: string;
  type: "direct" | "group";
  name?: string;
  createdBy?: string | User;
  admins?: string[] | User[];
  participants?: User[] | string[];
  participant?: User; // in direct chat returned by backend
  lastMessage?: LastMessage;
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  _id: string;
  conversation: string;
  sender: string | User;
  text: string;
  createdAt: string;
  updatedAt?: string;
  status?: "pending" | "sent" | "failed"; // for optimistic UI
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface MessagesResponse {
  messages: Message[];
  hasMore?: boolean;
}
