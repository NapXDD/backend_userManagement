const meetingController = require("../controllers/meetingController.js");
const {
  verifyToken,
  verifyTokenAndUser,
  verifyTokenAndUserAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.get("/", verifyToken, meetingController.getAllMeeting);

//GET USER BY ID
router.get("/:id", verifyToken, meetingController.getMeetingById);

//DELETE USER
router.delete(
  "/:id/delete",
  verifyTokenAndUserAuthorization,
  meetingController.deleteMeeting
);

//UPDATE MEETING
router.put("/:id/update", verifyToken, meetingController.updateMeeting);

//CREATE MEETING
router.post("/createMeeting", verifyToken, meetingController.addMeeting);

module.exports = router;
