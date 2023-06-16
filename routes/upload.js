const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndUser,
  verifyTokenAndUserAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyToken");
const {
  uploadCloud,
  uploadDocsCloud,
  uploadDocx,
  uploadPdf,
  uploadDoc,
} = require("../middleware/uploader.js");

//UPLOAD IMAGE
router.post(
  "/cloudinary-upload",
  verifyToken,
  uploadCloud.single("image"),
  (req, res, next) => {

    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    res.json({ secure_url: req.file.path });
  }
);

router.post(
  "/cloudinary-upload-pdf",
  verifyToken,
  uploadPdf.single("file"),
  (req, res, next) => {
    console.log(req.file.path);
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }

    res.json({ secure_url: req.file.path });
  }
);

router.post(
  "/cloudinary-upload-doc",
  verifyToken,
  uploadDoc.single("file"),
  (req, res, next) => {
    console.log(req.file.path);
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }

    res.json({ secure_url: req.file.path });
  }
);

router.post(
  "/cloudinary-upload-docx",
  uploadDocx.single("file"),
  (req, res, next) => {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }

    res.json({ secure_url: req.file.path });
  }
);
module.exports = router;
