const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require("dotenv").config();

//model
const User = require('../models/user');

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

const compareHash = async (plaintext, hashtext) => {
    try {
        const result = await bcrypt.compare(plaintext, hashtext);
        return { status: result };
    } catch (error) {
        console.error("Error in bcrypt compare:", error);
        throw new Error("Error bcrypt compare");
    }
};

const findUser = async (username) => {
    try {
        const result = await User.findOne({username:username});
        return {
            _id:result._id,
            userId:result.userId,
            username:result.username,
            password:result.password
        };
    } catch (error) {
        return error.message;
    }
}

//
router.post('/', async (req, res) => {
    const playload = {
        username: req.body.username,
        password: req.body.password
    }
    try {
        const result = await findUser(playload.username);
        const compareStatus = await compareHash(playload.password,result.password)
        const state = compareStatus.status;
        if (state) {
            const token = jwt.sign(result,process.env.KEY,{ expiresIn: 60 * 3 })
            return res.status(200).json({ result, token, state });
        } else {
            return res.status(200).json({ state })
        }
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

module.exports = router;