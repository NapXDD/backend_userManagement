const docsController = require("../controllers/docsController.js");
const {
  verifyToken,
  verifyTokenAndUserAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyToken");
const { uploadCloud } = require("../middleware/uploader.js");

const router = require("express").Router();
//GET ALL DOCS
router.get("/", verifyToken, docsController.getAllDocs);

//GET DOCS BY ID
router.get("/:id", verifyToken, docsController.getDocById);

//CREATE DOCS PDF
router.post(
  "/addPDF",
  verifyTokenAndAdmin,
  uploadCloud.single("pdf"),
  docsController.addDoc
);

//CREATE DOCS DOC
router.post(
  "/addDOC",
  verifyTokenAndAdmin,
  uploadCloud.single("doc"),
  docsController.addDoc
);

//CREATE DOCS DOCX
router.post(
  "/addDOCX",
  verifyTokenAndAdmin,
  uploadCloud.single("docx"),
  docsController.addDoc
);

//DELETE USER
router.delete(
  "/:id/delete",
  verifyTokenAndUserAuthorization,
  docsController.deleteDoc
);

module.exports = router;
