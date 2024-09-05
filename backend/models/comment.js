const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
    commentId: Number,
    comment: String,
    eventId: Number,
    userId: Number,
}, { collection: 'comment' }); //จะสร้าง collection(Table) ให้เลยไม่ต้องไปสร้างใน MongoDB compass
module.exports = mongoose.model("Comment", commentSchema);