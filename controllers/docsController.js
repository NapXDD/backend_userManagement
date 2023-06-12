const Docs = require("../models/Documents");
const axios = require("axios");
const fs = require("fs");

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
      const newPost = await new Docs({
        docName: "",
        description: "",
        submitDate: "",
        uploadBy: "",
        uploaderID: "",
        filePath: "",
      });

      const post = await newPost.save();
      return res.status(200).json(post);
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

  downloadDoc: async (req, res) => {
    const url = `cloudinaryURL/${req.body.filePath}`;
    const destinationPath = req.body.destinationPath;
    try {
      const response = await axios.get(url, {
        responseType: "arraybuffer",
      });

      fs.writeFileSync(destinationPath, response.data);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = docsController;
