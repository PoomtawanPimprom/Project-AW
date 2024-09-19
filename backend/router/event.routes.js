const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Event = require("../models/event");
const User = require("../models/user");
const authorization = require("../middleware/authentication")

// GET GetEvent : Success...
router.get("/", authorization, async (req, res) => {
  try {
    const data = await Event.find().sort({ eventId: -1 }); // select * from events and sort by eventId descending
    return res.json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET GetEventByEventId : Success
router.get("/:objectId", authorization, async (req, res) => {
  const { objectId } = req.params;
  try {
    const data = await Event.findOne({ _id: objectId }); // select * from events where _id = objectId
    return res.json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET GetEventByObjectId : Success
router.get('/creator/:creatorId', authorization, async (req, res) => {
  try {
      const events = await Event.find({ creator: req.params.creatorId });
      res.status(200).json(events);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// POST CreateEvent : Success
router.post("/", authorization, async (req, res) => {
  
  const { image, name, location, date_time, description, creator } = req.body;

  try {
    let newEventId = 1;
    const latestEvent = await Event.findOne().sort({ eventId: -1 });

    if (latestEvent) {
      newEventId = parseInt(latestEvent.eventId, 10) + 1;
    }
    // console.log('Creator ID received in backend:', creator);
    const newEvent = new Event({
      eventId: newEventId,
      image,
      name,
      location,
      date_time,
      description,
      creator: new mongoose.Types.ObjectId(creator)
    });

    await newEvent.save();

    return res.status(201).json(newEvent);
  } catch (err) {
    console.error("Error creating event:", err);
    return res.status(400).json({ error: err.message });
  }
});

// PUT UpdateEventByEventId
// router.put("/:eventId", authorization, async (req, res) => {
//   const { eventId } = req.params;
//   const updateData = req.body;

//   delete updateData.eventId;

//   try {
//     const updateEvent = await Event.findOneAndUpdate(
//       { eventId: eventId },
//       { $set: updateData },
//       { new: true }
//     );
    
//     if (!updateEvent) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     return res.status(200).json(updateEvent);
//   } catch (err) {
//     return res.status(400).json(err);
//   }
// });

// PUT UpdateEventByObjectId : Success
router.put("/:objectId", authorization, async (req, res) => {
  const { objectId } = req.params;
  const updateData = req.body;
  delete updateData.eventId;

  try {
    const updateEvent = await Event.findByIdAndUpdate(
      objectId,
      { $set: updateData },
      { new: true }
    );

    if (!updateEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json(updateEvent);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// DELETE DeleteEventByObjectId : Success
router.delete("/:objectId", authorization, async (req, res) => {
  const { objectId } = req.params;
  try {
    const deleteEvent = await Event.findByIdAndDelete(objectId); // delete from events where _id = objectId
    if (!deleteEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.status(200).json("Delete complete!");
  } catch (err) {
    return res.status(400).json(err);
  }
});

// GET GetLatestEventId : Success
router.get("/latest/eventId", authorization, async (req, res) => {
  try {
    const latestEvent = await Event.findOne().sort({ eventId: -1 });
    if (!latestEvent) {
      return res.status(404).json({ message: "No events found" });
    }
    return res.status(200).json({ latestEventId: latestEvent.eventId });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET GetUsernameByObjectId : Success
router.get("/username/:objectId", authorization, async (req, res) => {
  const { objectId } = req.params;

  try {
    const user = await User.findById(objectId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ username: user.username });
  } catch (err) {
    return res.status(500).json(err);
  }
  
});

module.exports = router;