const mongoose = require("mongoose");
const Event = require("../models/event");
const User = require("../models/user");
const commentSchema = new mongoose.Schema({
    comment: String,
    eventId: Number,
    createdAt: Date,
    updateAt: Date,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { collection: 'comment' }); // จะสร้าง collection(Table) ให้เลยไม่ต้องไปสร้างใน MongoDB compass
module.exports = mongoose.model("Comment", commentSchema);