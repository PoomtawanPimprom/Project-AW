const express = require("express");
const router = express.Router();
const Friend = require("../models/friend");

// GET GetFriendByFriendId
router.get("/:friendId", async (req, res) => {
    const { friendId } = req.params;
    try {
        const data = await Friend.findOne({ friendId: friendId })
            .populate('userId1') // Populate the userId1 with User data
            .populate('userId2')
            .exec();
            
        if (!data) {
            return res.status(404).json({ message: "Friend not found" });
        }
        
        return res.json(data); // data will include userId1 details
    } catch (err) {
        return res.status(500).json(err);
    }
});

// GET GetUserId1
router.get("/imfor/:userId1", async (req, res) => {
    const userId1 = req.params.userId1;
    try {
        // ค้นหาข้อมูล userId1 และ populate ฟิลด์ userId1
        const data = await Friend.findOne({ userId1: userId1 })
            .populate('userId1')
            .exec();
        
        // ถ้าไม่พบข้อมูล ให้ส่งสถานะ 404
        if (!data) {
            return res.status(404).json({ message: 'User not found' });
        }

        // ส่งคืนเฉพาะข้อมูลของ userId1
        const userId1Data = data.userId1;
        return res.json(userId1Data);
    } catch (err) {
        // ถ้ามีข้อผิดพลาด ให้ส่งสถานะ 500
        return res.status(500).json({ message: 'Error fetching userId1', error: err.message });
    }
});

// GET GetFriends with status == accepted for both userId1 and userId2
router.get("/accepted/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        // ดึงข้อมูลเพื่อนที่มีสถานะเป็น accepted ซึ่ง userId อาจเป็น userId1 หรือ userId2
        const data = await Friend.find({
            $or: [
                { userId1: userId, status: 'accepted' },
                { userId2: userId, status: 'accepted' }
            ]
        })
        .populate('userId1', 'name email image institute') // Populate ข้อมูลของ userId1
        .populate('userId2', 'name email image institute') // Populate ข้อมูลของ userId2
        .exec();

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No accepted friends found" });
        }

        return res.json(data);
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching accepted friends', error: err.message });
    }
});


// GET GetFriendByUserIds with status == pending
router.get("/pending/:userId1", async (req, res) => {
    const { userId1 } = req.params;
    try {
        // ดึงข้อมูลเพื่อนที่มีสถานะเป็น pending ซึ่ง userId1 หรือ userId2
        const data = await Friend.find({ 
            $or: [
                { userId1: userId1, status: 'pending' },
                { userId2: userId1, status: 'pending' }
            ]
        })
        .populate('userId1', 'name email image institute') // Populate ข้อมูลของ userId1
        .populate('userId2', 'name email image institute') // Populate ข้อมูลของ userId2
        .exec();

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No pending friends found" });
        }

        return res.json(data);
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching pending friends', error: err.message });
    }
});


// GET GetAllFriendsByUserId
router.get("/all/:userId1", async (req, res) => {
    const { userId1 } = req.params;
    try {
        // ค้นหาเพื่อนทั้งหมดของ userId1 โดยไม่สนสถานะ
        const data = await Friend.find({
            userId1: userId1
        })
        .populate('userId2') // Populate ข้อมูลของ userId2
        .exec();
        // ตรวจสอบว่ามีเพื่อนหรือไม่
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No friends found" });
        }

        // ส่งคืนรายการเพื่อนทั้งหมดเป็น JSON
        return res.json(data);
    } catch (err) {
        // จัดการ error และส่ง error message กลับไปที่ client
        return res.status(500).json({ message: 'Error fetching friends', error: err.message });
    }
});

// PUT UpdateFriendStatus
router.put("/updateFriendAccepted", async (req, res) => {
    const { userId1, userId2 } = req.body;
    try {
        const updatedFriend = await Friend.findOneAndUpdate(
            {
                userId1: userId1,
                userId2: userId2
            },
            {
                status: 'accepted'
            },
            { new: true }
        ).exec();

        if (!updatedFriend) {
            return res.status(404).json({ message: "Friend not found" });
        }
        return res.json(updatedFriend);
    } catch (err) {
        return res.status(500).json({ message: 'Error updating friend status', error: err.message });
    }
});

// DELETE Friend by userId1 and userId2 (รองรับการสลับ userId1 และ userId2)
router.delete("/deleteFriend/:userId1/:userId2", async (req, res) => {
    const { userId1, userId2 } = req.params;
    try {
        // ค้นหาและลบ friend ไม่ว่าจะ userId1, userId2 จะถูกสลับกันหรือไม่
        const deletedFriend = await Friend.findOneAndDelete({
            $or: [
                { userId1: userId1, userId2: userId2 },
                { userId1: userId2, userId2: userId1 }
            ]
        }).exec();

        if (!deletedFriend) {
            return res.status(404).json({ message: "Friend not found" });
        }

        return res.json({ message: "Friend deleted successfully", deletedFriend });
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting friend', error: err.message });
    }
});



module.exports = router;
