import { UserInterface } from "./user.interface";

export interface ChatListInterface {
  bookmarked: boolean;
  name: string;
  username?: string;
  lastMessage?: any;
  unreadCount?: number;
  lastMessageTime?: string;
  _id: string;
  project?: any;
  mutedBy?: any;
  pinnedBy?: any;
  sender?: UserInterface;
}

export interface ChatMessageInterface {
  username: string;
  time: string;
  companyName: string;
  message: string;
  seen: boolean;
  myMessage: boolean;
  files?: any;
  replyOf?: any;
  _id: any;
  id?: any;
  readBy?: UserInterface[];
  pinnedBy?: any;
  sender?: UserInterface;
  title?: string;
  voiceUrl?: string;
  dueDate?: any;
  type: "message" | "questioniar" | "voice";
}
