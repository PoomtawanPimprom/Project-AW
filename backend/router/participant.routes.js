const express = require("express");
const router = express.Router();
const Participant = require("../models/participant");

// GET GetParticipant
// router.get("/", async (req, res) => {
//   try {
//     const data = await Participant.find().sort({ participantId: -1 });
//     return res.json(data);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

// GET GetParticipantByMemberAndEventId
router.get("/", async (req, res) => {
  const { member, eventId } = req.query;
  try {
    const data = await Participant.findOne({ member: member, eventId: eventId });
    
    if (data) {
      return res.json(data);
    } else {
      return res.status(404).json("Participant not found.");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET GetParticipantByMember
// router.get("/member/:username", async (req, res) => {
//   const { username } = req.params;
//   try {
//     const data = await Participant.find({ member: username }).sort({ participantId: -1 });
//     return res.json(data);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

// POST CreateParticipant (used)
router.post("/", async (req, res) => {
  const { member, eventId, status } = req.body;

  try {
    const latestParticipant = await Participant.findOne().sort({ participantId: -1 });
    let newParticipantId = 1;
    if (latestParticipant) {
      newParticipantId = parseInt(latestParticipant.participantId, 10) + 1;
    }

    const newParticipant = new Participant({
      participantId: newParticipantId,
      member,
      eventId,
      status,
    });

    await newParticipant.save();

    return res.status(201).json(newParticipant);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// PUT UpdateParticipantByParticipantID
// router.put("/:participantId", async (req, res) => {
//   const { participantId } = req.params;
//   const updateData = req.body;

//   delete updateData.participantId;

//   try {
//     const updateParticipant = await Participant.findOneAndUpdate(
//       { participantId: participantId },
//       { $set: updateData },
//       { new: true }
//     );
    
//     if (!updateParticipant) {
//       return res.status(404).json({ message: "Participant not found" });
//     }

//     return res.status(200).json(updateParticipant);
//   } catch (err) {
//     return res.status(400).json(err);
//   }
// });

// DELETE DeleteParticipantByMemberAndEventId
router.delete("/", async (req, res) => {
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
router.get("/latest/participantId", async (req, res) => {
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

module.exports = router;