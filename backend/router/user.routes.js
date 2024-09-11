const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/:username", async (req, res) => {
    const { username } = req.params;
  
    try {
        const data = await User.find({username: username}).exec();
        return res.status(200).json(data);
    } catch (err) {
      return res.status(400).json(err);
    }
});


  
module.exports = router;