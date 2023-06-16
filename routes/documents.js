const docsController = require("../controllers/docsController.js");
const {
  verifyToken,
  verifyTokenAndUserAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyToken");
const {
  uploadDocsCloud,
  uploadDoc,
  uploadDocx,
  uploadPdf,
} = require("../middleware/uploader.js");

const router = require("express").Router();
//GET ALL DOCS
router.get("/", verifyToken, docsController.getAllDocs);

//GET DOCS BY ID
router.get("/:id", verifyToken, docsController.getDocById);

//CREATE DOCS PDF
router.post(
  "/addPDF",
  verifyTokenAndAdmin,
  uploadPdf.single("file"),
  docsController.addDoc
);

//CREATE DOCS DOC
router.post(
  "/addDOC",
  verifyTokenAndAdmin,
  uploadDoc.single("file"),
  docsController.addDoc
);

//CREATE DOCS DOCX
router.post(
  "/addDOCX",
  verifyTokenAndAdmin,
  uploadDocx.single("file"),
  docsController.addDoc
);

//DELETE USER
router.delete(
  "/:id/delete",
  verifyTokenAndUserAuthorization,
  docsController.deleteDoc
);

module.exports = router;
