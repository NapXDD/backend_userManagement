const mongoose = require("mongoose");

const meetingSchema = mongoose.Schema({
  roomName: {
    type: String,
    max: 10,
    require: true,
  },
  dateTime: {
    type: Date,
    require: true,
  },
  requestBy: {
    type: String,
    require: true,
  },
  approveStatus: {
    type: Boolean,
    require: true,
    default: false,
  },
});

module.exports = mongoose.model("meeting", meetingSchema);
