require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Model
const User = require('../models/user');

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

const makeHash = async (plainText) => {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds);
    const result = await bcrypt.hash(plainText, salt);
    return result;
};

const insertUser = async (data) => {
    try {
        const user = new User(data);
        const savedUser = await user.save();
        return { message: "sign up successful" }
    } catch (err) {
        return { message: err.message };
    }
}

const getLatestUser = async () => {
    try {
        const LatestUser = await User.findOne().sort({ userId: -1 });

        if (LatestUser) {
            number = parseInt(LatestUser.userId, 10) + 1;
            return parseInt(number)
        }
        else {
            number = 1
            return number
        }

    } catch (err) {
        return { message: err.message };
    }
}

const checkExistingUser = async (username, email) => {
    try {
        const user = await User.findOne({ $or: [{ username }, { email }] });
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
}

// Method
router.post('/', async (req, res) => {
    try {
        const { username, email } = req.body;
        
        const existingUser = await checkExistingUser(username, email);

        if (existingUser) {
            if (existingUser.username === username && existingUser.email === email) {
                return res.status(400).json({ state: false, message: 'ชื่อผู้ใช้และอีเมลถูกใช้งานแล้ว' });
            }
            if (existingUser.username === username) {
                return res.status(400).json({ state: false, message: 'ชื่อผู้ใช้ถูกใช้งานแล้ว' });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ state: false, message: 'อีเมลถูกใช้งานแล้ว' });
            }
        }

        const hashPassword = await makeHash(req.body.password);
        const number = await getLatestUser();

        const payload = {
            userId: number,
            name: req.body.username,
            username: req.body.username,
            password: hashPassword,
            email: req.body.email,
            image: "https://img5.pic.in.th/file/secure-sv1/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg", // default profile
        }

        const result = await insertUser(payload);

        if (result.message === "sign up successful") {
            return res.status(200).json({ state: true, message: result.message });
        } else {
            return res.status(400).json({ state: false, message: result.message });
        }
    } catch (err) {
        return res.status(500).json({ state: false, message: err.message });
    }
});

module.exports = router;