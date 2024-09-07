const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
    eventId: Number,
    image: String,
    name: String,
    location: String,
    date_time: Date,
    description: String,
    creator: String,
}, { collection: 'event' });
module.exports = mongoose.model("Event", eventSchema);