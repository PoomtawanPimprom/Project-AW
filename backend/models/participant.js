const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participantSchema = new mongoose.Schema({
    participantId: Number,
    member: { type: Schema.Types.ObjectId, ref: 'User' },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
    status: String,
}, { collection: 'participant' });
module.exports = mongoose.model("Participant", participantSchema);