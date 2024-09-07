const express = require("express");
const router = express.Router();
const Event = require("../models/event");

// GET GetEvent
router.get("/", async (req, res) => {
  try {
    const data = await Event.find(); //  select * from events
    return res.json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET GetEventByEventId
router.get("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  try {
    const data = await Event.find({ eventId: eventId }); // select * from events where eventId = eventId
    return res.json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// POST CreateEvent
router.post("/", async (req, res) => {
  const { eventId, image, name, location, date_time, description, creator } = req.body;
  try {
    const newEvent = new Event({ eventId, image, name, location, date_time, description, creator }); 
    // = insert into events (eventId, image, name, location, date_time, description, creator) values (eventId, image, name, location, date_time, description, creator);
    await newEvent.save();
    return res.status(201).json(newEvent);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// PUT UpdateEventByEventID
router.put("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const { event } = req.body;
  try {
    const updateEvent = await Event.findOneAndUpdate(
      // = update events SET event = event WHERE eventId = eventId;
      { eventId: eventId }, // where
      { event: event }
    ); // data
    return res.status(201).json(updateEvent);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// DELETE DeleteEventById
router.delete("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  try {
    const deleteEvent = await Event.findOneAndDelete({ eventId: eventId }); // delete from events where eventId=eventId;
    return res.status(200).json("delete complete!");
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
