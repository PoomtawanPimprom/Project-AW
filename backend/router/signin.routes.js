const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require("dotenv").config();

// Model
const User = require('../models/user');

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

const compareHash = async (plaintext, hashText) => {
    try {
        const result = await bcrypt.compare(plaintext, hashText);
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
            _id: result._id,
            userId: result.userId,
            username: result.username,
            password: result.password
        };
    } catch (error) {
        return error.message;
    }
}

// Method
router.post('/', async (req, res) => {
    const payload = {
        username: req.body.username,
        password: req.body.password
    }
    try {
        const result = await findUser(payload.username);
        if (!result || !result.username) {
            return res.status(404).json({ message: "ไม่พบข้อมูลผู้ใช้งาน" });
        }
        const compareStatus = await compareHash(payload.password,result.password)
        const state = compareStatus.status;
        if (state) {
            const token = jwt.sign(result,process.env.KEY,{ expiresIn: 60 * 60 * 3 }) // 3 hours
            // const token = jwt.sign(result,process.env.KEY,{ expiresIn: 60 * 1 }) // for test 1 minutes
            return res.status(200).json({ result, token, state });
        } else {
            return res.status(200).json({ state })
        }
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

module.exports = router;