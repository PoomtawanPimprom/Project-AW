const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
// GET getComment
router.get('/', async (req, res) => {
    try {
        const data = await Comment.find(); //  Select * from comments
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
            .populate("userId")
            .sort({ createdAt: -1 })
            .exec();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(err);
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

        const updateComment = await Comment.findByIdAndUpdate( // = UPDATE comments SET comment = comment WHERE commentId = commentId;
            _id, // where
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