const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 6,
      max: 20,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    birthDay:{
      type: String,
      default: ""
    },
    avatar:{
      type: String,
      default: "335394526_475480261343072_8119553063540778048_n_jopxzq.jpg"
    },
    bio:{
      type: String,
      min: 1,
      max: 50,
      default: ""
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
