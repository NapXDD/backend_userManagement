const Posts = require("../models/Posts");

const postsController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Posts.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id);
      res.status(200).json(post._doc);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  addPost: async (req, res) => {
    try {
      //Create new user
      const newPost = await new Posts({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        uploadDate: req.body.uploadDate,
        authorID: req.body.authorID,
      });

      const post = await newPost.save();
      return res.status(200).json(post);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      await Posts.findByIdAndDelete(req.params.id);
      return res.status(200).json("Post deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  updatePost: async (req, res) => {
    try {
      await Posts.findByIdAndUpdate(req.params.id, req.body);
      return res.status(200).json("Post updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = postsController;
