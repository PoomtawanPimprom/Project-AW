const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/user");

router.get('/', async (req, res) => {
  try {
      const data = await User.find()
      return res.json(data);
  } catch (err) {
      return res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {

    const userId = req.params.id;
  
    try {
        const data = await User.find({userId: userId}).exec();
        return res.status(200).json(data);
    } catch (err) {
      return res.status(400).json(err);
    }
});

// PUT updateUser
router.put('/:object_userId', async (req, res) => {
    const _id = req.params.object_userId;
    const { user } = req.body
    try {
        const ObjectId = mongoose.Types.ObjectId;
        if (!ObjectId.isValid(_id)) {
            return res.status(400).send('Invalid ID');
        }

        const updateUser = await User.findByIdAndUpdate(
          _id,
            {
              name: user.name,
              email: user.email,
              institute: user.institute,
              major: user.major,
              age: user.age,
              facebook: user.facebook,
              instagram: user.instagram,
              tiktok: user.tiktok,
              image: user.image,
              updateAt: Date.now()
            },
              { 
                new: true 
              });// data
        return res.status(201).json(updateUser);
    } catch (err) {
        return res.status(400).json(err.message);
    }
});

  
module.exports = router;