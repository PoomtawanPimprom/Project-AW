import { userInterface } from "./user.model";

export interface Friend {
    friendId: string,
    userId1: userInterface,
    userId2: userInterface,
    status: 'pending' | 'accepted',
}
