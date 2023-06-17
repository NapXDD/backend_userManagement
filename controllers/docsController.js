const Docs = require("../models/Documents");
const cloudinary = require("cloudinary").v2;

const docsController = {
  getAllDocs: async (req, res) => {
    try {
      const posts = await Docs.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  getDocById: async (req, res) => {
    try {
      const post = await Docs.findById(req.params.id);
      res.status(200).json(post._doc);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  addDoc: async (req, res) => {
    try {
      //Create new user
      const newDoc = await new Docs({
        docName: req.body.docName,
        description: req.body.description,
        submitDate: req.body.submitDate,
        uploadBy: req.body.uploadBy,
        uploaderID: req.body.uploaderID,
        filePath: req.file.path,
      });

      const doc = await newDoc.save();

      return res.status(200).json(doc);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  deleteDoc: async (req, res) => {
    try {
      const doc = await Docs.findById(req.params.id);
      const filePath = doc.filePath;
      const fileName = `${filePath.split("/")[7]}/${filePath.split("/")[8]}`;
      await Docs.findByIdAndDelete(req.params.id);
      cloudinary.uploader.destroy(fileName, { resource_type: "raw" });
      return res.status(200).json("Doc deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = docsController;
