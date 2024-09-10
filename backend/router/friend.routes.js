const express = require("express");
const router = express.Router();
const Friend = require("../models/friend");

// GET getFriend
router.get('/', async (req, res) => {
    try {
        const data = await Friend.find(); //  Select * from friend
        return res.json(data);
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;
