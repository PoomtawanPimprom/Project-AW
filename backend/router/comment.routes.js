const express = require('express');
const router = express.Router();

const Authentication = require("../middleware/authentication")
//model
const Comment = require('../models/comment');

const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

// GET getAllCommentsByEventID
router.get('/:objectId_event', Authentication, async (req, res) => {
    const _id = req.params.objectId_event
    try {
        const data = await Comment.find({ eventObjId: _id })
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
router.post('/', Authentication, async (req, res) => {
    const { comment, event_objectId, object_userId } = req.body;
    try {
        const newComment = new Comment({
            comment,
            eventObjId: event_objectId,
            createdAt: Date.now(),
            userId: new ObjectId(object_userId)
        });
        await newComment.save();
        return res.status(201).json(newComment);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
});

// POST createReplyComment
router.post("/reply", Authentication, async (req, res) => {
    const { objParentComment, comment, object_userId } = req.body;
    try {
        const newComment = new Comment({
            comment: comment,
            createdAt: Date.now(),
            userId: new ObjectId(object_userId)
        });
        const result = await newComment.save();
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

// PUT updateCommentByCommentID
router.put('/edit/:object_commentId', Authentication, async (req, res) => {
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
            { new: true });
        return res.status(201).json(updateComment);
    } catch (err) {
        return res.status(400).json(err);
    }
});

// DELETE commentById
router.delete('/:object_commentId', Authentication, async (req, res) => {
    const _id = req.params.object_commentId;
    try {
        const comment = await Comment.findById(_id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        await Comment.deleteMany({ _id: { $in: comment.replies } });
        await Comment.findByIdAndDelete(_id);
        return res.status(200).json('delete complete!');
    } catch (err) {
        return res.status(400).json(err);
    }
})

module.exports = router;