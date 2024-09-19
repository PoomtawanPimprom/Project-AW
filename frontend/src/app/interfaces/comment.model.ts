import { userInterface } from "./user.model";

export interface commentInterface{
    _id: string,
    commentId: number,
    comment: string,
    eventObjId: string,
    userId: userInterface,
    replies: commentInterface[]
}