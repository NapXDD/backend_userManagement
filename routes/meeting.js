const meetingController = require("../controllers/meetingController.js");
const {
  verifyToken,
  verifyTokenAndUser,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.get("/", verifyToken, meetingController.getAllPosts);

//GET USER BY ID
router.get("/:id", verifyToken, meetingController.getPostById);

//DELETE USER
router.delete(
  "/:id/delete",
  verifyTokenAndUserAuthorization,
  meetingController.deletePost
);

//UPDATE USER
router.put("/:id/update", verifyTokenAndUser, meetingController.updatePost);

module.exports = router;