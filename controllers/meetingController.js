const Meeting = require("../models/Meeting");
const bcrypt = require("bcrypt");

const meetingController = {
  //GET ALL USER
  getAllMeeting: async (req, res) => {
    try {
      const meet = await Meeting.find();
      res.status(200).json(meet);
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
      const meet = await meeting.findById(req.params.id);
      await meet.findByIdAndDelete(req.params.id);
      return res.status(200).json("Meeting deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //CREATE MEETING
  addMeeting: async (req, res) => {
    try {
      //Create new user
      const newMeeting = await new Meeting({
        roomName: req.body.roomName,
        dateTime: req.body.time,
        requesterName: req.body.requesterName,
        requesterID: req.body.requesterID,
      });
      const meeting = await newMeeting.save();
      return res.status(200).json(meeting);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  //UPDATE A USER
  updateMeeting: async (req, res) => {
    try {
      await Meeting.findByIdAndUpdate(req.body.id, req.body.approveStatus);
      res.status(200).json("User updated");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = meetingController;
