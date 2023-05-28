const posts = require("../models/Posts");

const postsController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await posts.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await posts.findById(req.params.id);
      res.status(200).json(post._doc);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  addPost: async (req, res) => {
    try {
      //Create new user
      const newPost = await new posts({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        uploadDate: req.body.uploadDate,
        authorID: req.body.authorID,
      });

      const post = await newPost.save();
      return res.status(200).json(post);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = await posts.findById(req.params.id);
      await post.findByIdAndDelete(req.params.id);
      return res.status(200).json("User deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  updatePost: async (req, res) => {
    try {
      const content = req.body.content;
      await posts.findByIdAndUpdate(req.params.id, content);
      return res.status(200).json("User password updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = postsController;
