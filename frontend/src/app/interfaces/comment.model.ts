import { userInterface } from "./user.model";

export interface commentInterface{
    _id: string,
    commentId: number,
    comment: string,
    eventId: number,
    userId: userInterface,
    replies: commentInterface[]
}