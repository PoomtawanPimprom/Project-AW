const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/user");
const Friend = require("../models/friend");

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

// POST เพิ่มเพื่อน
router.post('/addFriend', async (req, res) => {
    const { userId1, userId2 } = req.body;

    if (!userId1 || !userId2) {
    return res.status(400).json({ message: 'User IDs are required' });
    }

    try {
    // ตรวจสอบว่าผู้ใช้ทั้งสองคนมีอยู่ในฐานข้อมูล
    const user1 = await User.findById(userId1);
    const user2 = await User.findById(userId2);

    if (!user1 || !user2) {
        return res.status(404).json({ message: 'User not found' });
    }

    // ตรวจสอบว่าคำขอเพื่อนมีอยู่แล้วหรือไม่
    const existingFriend = await Friend.findOne({
        $or: [
        { userId1: userId1, userId2: userId2 },
        { userId1: userId2, userId2: userId1 }
        ]
    });

    if (existingFriend) {
        return res.status(400).json({ message: 'Friend request already exists' });
    }

    // สร้างคำขอเพื่อนใหม่
    const newFriend = new Friend({
        userId1,
        userId2,
        status: 'pending',
        createAt: new Date()
    });

    await newFriend.save();
    return res.status(201).json(newFriend);
    } catch (err) {
    return res.status(500).json(err);
    }
});



module.exports = router;