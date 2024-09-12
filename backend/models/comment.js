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
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { collection: 'comment' });

module.exports = mongoose.model("Comment", commentSchema);