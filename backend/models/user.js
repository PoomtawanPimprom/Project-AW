const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      unique: true,
      required: true,
    },
    name: String,
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    institute: String,
    major: String,
    age: Number,
    interest: String,
    facebook: String,
    instagram: String,
    tiktok: String,
    image: String,
  },
  { collection: "user" }
);
module.exports = mongoose.model("User", userSchema);