import { userInterface } from "./user.model";

export interface commentReplyInterface{
    _id: string,
    commentId: number,
    comment: string,
    eventId: number,
    userId: userInterface,
    replies: commentReplyInterface[]
}