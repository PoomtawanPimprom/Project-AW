const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
// GET getComment
router.get('/', async (req, res) => {
    try {
        const data = await Comment.find()
        return res.json(data);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// GET getOneCommentByEventID
router.get('/onecomment/:eventId', async (req, res) => {
    const eventID = req.params.eventId;
    try {
        const data = await Comment.findOne({ eventId: eventID })
            .populate("userId")
            .exec();
        return res.json(data);
    } catch (err) {
        return res.status(500).json(err);
    }
});


// GET getAllCommentsByEventID
router.get('/:eventId', async (req, res) => {
    const id = req.params.eventId
    try {
        const data = await Comment.find({ eventId: id })
            .populate({ path: 'userId', select: "name image" })
            .populate({
                path: 'replies', populate: {
                    path: 'userId',
                    select: 'name image',
                }
            })
            .sort({ createdAt: -1 })
            .exec();
        data.forEach(comment => {
            comment.replies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        });
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

// POST createComment
router.post('/', async (req, res) => {
    const { comment, eventId, object_userId } = req.body;
    try {
        const newComment = new Comment({
            comment,
            eventId: Number(eventId),
            createdAt: Date.now(),
            userId: new ObjectId(object_userId)
        }); // = INSERT INTO comments (commentId, comment, eventId, userId) VALUES (commentId, comment, eventId, userId);
        await newComment.save();
        return res.status(201).json(newComment);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
});

// POST createReplyComment
router.post("/reply", async (req, res) => {
    const { objParentComment, comment, object_userId } = req.body;
    try {
        //create a new comment
        const newComment = new Comment({
            comment: comment,
            createdAt: Date.now(),
            userId: new ObjectId(object_userId)
        });
        const result = await newComment.save();
        //update parentcomment
        const parentComment = await Comment.findByIdAndUpdate(
            objParentComment,
            { $push: { replies: result._id } },
            { new: true }
        )
        return res.status(201).json({ newComment: result, parentComment });
    } catch (err) {
        return res.status(400).json(err.message);
    }
})

//update
//GET getCommentByObjectId_Comment
router.get("/edit/:objectId_comment", async (req, res) => {
    const id = req.params.objectId_comment;
    try {
        const data = await Comment.findById(id).exec();
        return res.json(data);
    } catch (err) {
        console.log(err)
    }
})

// PUT updateCommentByCommentID
router.put('/edit/:object_commentId', async (req, res) => {
    const _id = req.params.object_commentId;
    const { comment } = req.body
    try {
        const ObjectId = mongoose.Types.ObjectId;
        if (!ObjectId.isValid(_id)) {
            return res.status(400).send('Invalid ID');
        }

        const updateComment = await Comment.findByIdAndUpdate(
            _id,
            {
                comment: comment,
                updateAt: Date.now()
            },
            { new: true });// data
        return res.status(201).json(updateComment);
    } catch (err) {
        return res.status(400).json(err);
    }
});

// DELETE commentById
router.delete('/:object_commentId', async (req, res) => {
    const _id = req.params.object_commentId;
    try {
        const deleteComment = await Comment.findByIdAndDelete(_id); // DELETE FROM comments WHERE commentId=commentId;
        return res.status(200).json('delete complete!');
    } catch (err) {
        return res.status(400).json(err);
    }
})

module.exports = router;