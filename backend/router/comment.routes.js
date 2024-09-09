const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

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
            .exec();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// POST createComment
router.post('/', async (req, res) => {
    const { commentId, comment, eventId, object_userId } = req.body
    try {
        const newComment = new Comment({ 
            commentId:Number(commentId),
            comment,
            eventId:Number(eventId),
            userId:new mongoose.Types.ObjectId(object_userId) }); // = INSERT INTO comments (commentId, comment, eventId, userId) VALUES (commentId, comment, eventId, userId);
            await newComment.save();
        return res.status(201).json(newComment);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
});
// PUT updateCommentByCommentID
router.put('/:object_commentId', async (req, res) => {
    const { object_commentId } = req.params;
    const { comment } = req.body
    try {
        const updateComment = await Comment.findByIdAndUpdate( // = UPDATE comments SET comment = comment WHERE commentId = commentId;
            { commentId: object_commentId }, // where
            { comment: comment });// data
        return res.status(201).json(updateComment);
    } catch (err) {
        return res.status(400).json(err);
    }
});

// DELETE commentById
router.delete('/:object_commentId', async (req, res) => {
    const { object_commentId } = req.params;
    try {
        const deleteComment = await Comment.findByIdAndDelete(object_commentId); // DELETE FROM comments WHERE commentId=commentId;
        return res.status(200).json('delete complete!');
    } catch (err) {
        return res.status(400).json(err);
    }
})

module.exports = router;