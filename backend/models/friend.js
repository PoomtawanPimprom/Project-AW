const mongoose = require("mongoose");
const friendSchema = new mongoose.Schema({
    friendId: Number,
    userId1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userId2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: String,
    createAt: Date,
}, { collection: 'friend' });
module.exports = mongoose.model("Friend", friendSchema);