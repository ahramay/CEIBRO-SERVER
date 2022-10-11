import { UserInterface } from "./user.interface";

export interface InvitationInterface {
   from: UserInterface;
   createdAt: string;
   status: 'pending' | 'accepted' |'rejected';
   _id: string;
}