const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndUser,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");
const { uploadCloud } = require("../middleware/uploader.js");

//UPLOAD IMAGE
router.post(
  "/cloudinary-upload",
  verifyToken,
  uploadCloud.single("image"),
  (req, res, next) => {
    console.log(req.image);
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
  uploadCloud.single("pdfFile"),
  (req, res, next) => {
    console.log(req.file);
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
  uploadCloud.single("docFile"),
  (req, res, next) => {
    console.log(req.file);
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }

    res.json({ secure_url: req.file.path });
  }
);

router.post(
  "/cloudinary-upload-docx",
  verifyToken,
  uploadCloud.single("docxFile"),
  (req, res, next) => {
    console.log(req.file);
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }

    res.json({ secure_url: req.file.path });
  }
);
module.exports = router;
