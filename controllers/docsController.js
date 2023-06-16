const Docs = require("../models/Documents");

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
      const post = await Docs.findById(req.params.id);
      await post.findByIdAndDelete(req.params.id);
      return res.status(200).json("User deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = docsController;
