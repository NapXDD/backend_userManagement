const meeting = require("../models/Meeting");
const bcrypt = require("bcrypt");

const meetingController = {
  //GET ALL USER
  getAllMeeting: async (req, res) => {
    try {
      const meet = await meeting.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //GET USER BY ID
  getMeetingById: async (req, res) => {
    try {
      const meet = await meeting.findById(req.params.id);
      res.status(200).json(meet._doc);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE A USER
  deleteMeeting: async (req, res) => {
    try {
        const post = await posts.findById(req.params.id);
        await post.findByIdAndDelete(req.params.id);
        return res.status(200).json("Meeting deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
  },

  //UPDATE A USER
  updateMeeting: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json("User updated");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = meetingController;
