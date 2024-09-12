const mongoose = require("mongoose");
const friendSchema = new mongoose.Schema({
    friendId: Number,
    userId1: Number,
    userId2: Number,
    status: String,
    createAt: Date,
}, { collection: 'friend' });
module.exports = mongoose.model("Friend", friendSchema);