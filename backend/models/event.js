const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema({
    eventId: String,
    image: String,
    name: String,
    location: String,
    date_time: Date,
    description: String,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
}, { collection: 'event' });
module.exports = mongoose.model("Event", eventSchema);