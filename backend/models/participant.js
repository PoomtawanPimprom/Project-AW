const mongoose = require("mongoose");
const participantSchema = new mongoose.Schema({
    participantId: Number,
    member: String,
    eventId: Number,
    status: String,
}, { collection: 'participant' });
module.exports = mongoose.model("Participant", participantSchema);