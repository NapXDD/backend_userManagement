const postsController = require("../controllers/postsController.js");
const {
  verifyToken,
  verifyTokenAndUser,
  verifyTokenAndUserAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.get("/", verifyToken, postsController.getAllPosts);

//GET USER BY ID
router.get("/:id", verifyToken, postsController.getPostById);

router.post("/createPost", verifyTokenAndAdmin, postsController.addPost);

//DELETE USER
router.delete(
  "/:id/delete",
  verifyTokenAndUserAuthorization,
  postsController.deletePost
);

//UPDATE USER
router.put("/:id/update", verifyTokenAndUser, postsController.updatePost);

module.exports = router;