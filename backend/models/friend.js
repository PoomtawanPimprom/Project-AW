const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
    userId1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userId2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default: 'pending',
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now,
        required: true
    }
}, { versionKey: false, collection: 'friend' });

module.exports = mongoose.model("Friend", friendSchema);
