require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//model
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

const getLastestUser = async () => {
    try {
        const LastestUser = await User.findOne().sort({ userId: -1 });

        if (LastestUser) {
            number = parseInt(LastestUser.userId, 10) + 1;
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

//
router.post('/', async (req, res) => {
    makeHash(req.body.password)
        .then((hashpassword) => {
            getLastestUser()
                .then((number) => {
                    const playload = {
                        userId: number,
                        username: req.body.username,
                        password: hashpassword,
                        email: req.body.email,
                    }
                    insertUser(playload)
                        .then((result) => {
                            return res.status(200).json(result);
                        }).catch(
                            (err) => {
                                console.log(err)
                                return res.status(500).json(err.message);
                            })
                });
        }).catch((err) => {
            return res.status(500).json(err.message);
        })
});

module.exports = router;