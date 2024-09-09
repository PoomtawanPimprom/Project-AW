const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userId: Number,
    name: String,
    username: String,
    password: String,
    email: String,
    institute: String,
    major: String,
    age: Number,
    like: String,
    facebook: String,
    instagram: String,
    tiktok: String,
    image: String,
}, { collection: 'user' });
module.exports = mongoose.model("User", userSchema);