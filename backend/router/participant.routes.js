const express = require("express");
const router = express.Router();
const Participant = require("../models/participant");
const authorization = require("../middleware/authentication");

// GET GetParticipantByMemberAndEventId (used for check button)
router.get("/", authorization, async (req, res) => {
  const { member, eventId } = req.query;
  try {
    const data = await Participant.findOne({ member: member, eventId: eventId }).populate('member').populate('eventId');
    
    if (data) {
      return res.json(data);
    } else {
      return res.status(404).json("Participant not found.");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// POST CreateParticipant (used)
router.post("/", authorization, async (req, res) => {
  const { member, eventId, status } = req.body;

  try {
    const latestParticipant = await Participant.findOne().sort({ participantId: -1 });
    let newParticipantId = 1;
    if (latestParticipant) {
      newParticipantId = parseInt(latestParticipant.participantId, 10) + 1;
    }

    const newParticipant = new Participant({
      participantId: newParticipantId,
      member, // This should be ObjectId
      eventId, // This should be ObjectId
      status,
    });

    await newParticipant.save();

    return res.status(201).json(newParticipant);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// DELETE DeleteParticipantByMemberAndEventId (used)
router.delete("/", authorization, async (req, res) => {
  const { member, eventId } = req.query;
  try {
    const deleteParticipant = await Participant.findOneAndDelete({ member: member, eventId: eventId });
    if (deleteParticipant) {
      return res.status(200).json("Delete complete!");
    } else {
      return res.status(404).json("Participant not found.");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
});

// GET GetLatestParticipantId (used)
router.get("/latest/participantId", authorization, async (req, res) => {
  try {
    const latestParticipant = await Participant.findOne().sort({ participantId: -1 });
    if (!latestParticipant) {
      return res.status(404).json({ message: "No participants found" });
    }
    return res.status(200).json({ latestParticipantId: latestParticipant.participantId });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET CountMemberByEventId (used)
router.get("/count/:objectId", authorization, async (req, res) => {
  const { objectId } = req.params;

  try {
    const participantCount = await Participant.countDocuments({ eventId: objectId });
    
    return res.status(200).json({ count: participantCount });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;