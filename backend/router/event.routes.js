const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const authorization = require("../middleware/authentication")

// GET GetEvent
router.get("/", authorization, async (req, res) => {
  try {
    const data = await Event.find().sort({ eventId: -1 }); // select * from events and sort by eventId descending
    return res.json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET GetEventByEventId
router.get("/:eventId", authorization, async (req, res) => {
  const { eventId } = req.params;
  try {
    const data = await Event.findOne({ eventId: eventId }); // select * from events where eventId = eventId
    return res.json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET GetEventByCreator
router.get("/creator/:username", authorization, async (req, res) => {
  const { username } = req.params;
  try {
    const data = await Event.find({ creator: username }).sort({ eventId: -1 }); // select * from events where creator = username and sort by eventId descending
    return res.json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// // POST CreateEvent
// router.post("/", async (req, res) => {
//   const { eventId, image, name, location, date_time, description, creator } = req.body;
//   try {
//     const newEvent = new Event({ eventId, image, name, location, date_time, description, creator }); 
//     // = insert into events (eventId, image, name, location, date_time, description, creator) values (eventId, image, name, location, date_time, description, creator);
//     await newEvent.save();
//     return res.status(201).json(newEvent);
//   } catch (err) {
//     return res.status(400).json(err);
//   }
// });

// POST CreateEvent
router.post("/", authorization, async (req, res) => {
  const { image, name, location, date_time, description, creator } = req.body;

  try {
    const latestEvent = await Event.findOne().sort({ eventId: -1 });
    let newEventId = 1;
    if (latestEvent) {
      newEventId = parseInt(latestEvent.eventId, 10) + 1;
    }

    const newEvent = new Event({
      eventId: newEventId,
      image,
      name,
      location,
      date_time,
      description,
      creator
    });

    await newEvent.save();

    return res.status(201).json(newEvent);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// // PUT UpdateEventByEventID
// router.put("/:eventId", async (req, res) => {
//   const { eventId } = req.params;
//   const { name } = req.body;
//   try {
//     const updateEvent = await Event.findOneAndUpdate(
//       // = update events SET name = name WHERE eventId = eventId;
//       { eventId: eventId }, // where
//       { name: name }
//     ); // data
//     return res.status(201).json(updateEvent);
//   } catch (err) {
//     return res.status(400).json(err);
//   }
// });

// PUT UpdateEventByEventID
router.put("/:eventId", authorization, async (req, res) => {
  const { eventId } = req.params;
  const updateData = req.body;

  delete updateData.eventId;

  try {
    const updateEvent = await Event.findOneAndUpdate(
      { eventId: eventId },
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

// DELETE DeleteEventById
router.delete("/:eventId", authorization, async (req, res) => {
  const { eventId } = req.params;
  try {
    const deleteEvent = await Event.findOneAndDelete({ eventId: eventId }); // delete from events where eventId = eventId;
    return res.status(200).json("Delete complete!");
  } catch (err) {
    return res.status(400).json(err);
  }
});

// GET GetLatestEventId
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

module.exports = router;