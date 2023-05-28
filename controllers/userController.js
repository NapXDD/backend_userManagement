const User = require("../models/User");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

const userController = {
  //GET ALL USER
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //GET USER BY ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE A USER
  deleteUser: async (req, res) => {
    const defaultAva =
      "335394526_475480261343072_8119553063540778048_n_jopxzq.jpg";
    try {
      const user = await User.findById(req.params.id);
      const userAvaID = user.avatar.split(".")[0];
      if (user.avatar === defaultAva) {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("User deleted");
      } else if (user.avatar !== defaultAva) {
        cloudinary.uploader.destroy(`userManagement/${userAvaID}`);
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("User deleted");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //UPDATE A USER
  updateUser: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json("User updated");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE USER PASSWORD
  updateUserPassword: async (req, res) => {
    const currentPassword = req.body.currentPassword;
    const user = await User.findById(req.params.id);
    try {
      const checkPass = await bcrypt.compare(currentPassword, user.password);
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const newPassword = {
        password: hashed,
      };
      if (checkPass) {
        await User.findByIdAndUpdate(req.params.id, newPassword);
        return res.status(200).json("User password updated");
      } else {
        return res.status(404).json("Wrong current password");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //UPDATE USER AVATAR
  updateUserAvatar: async (req, res) => {
    const user = await User.findById(req.params.id);
    const currentAva = user.avatar;
    const currentAvaId = currentAva.split(".")[0];
    const defaultAva =
      "335394526_475480261343072_8119553063540778048_n_jopxzq.jpg";
    const fileData = req.file;
    const newAva = {
      avatar: fileData.path.split("/")[8],
    };
    try {
      if (currentAva !== defaultAva) {
        cloudinary.uploader.destroy(`userManagement/${currentAvaId}`);
        await User.findByIdAndUpdate(req.params.id, newAva);
        return res.status(200).json("User updated");
      } else if (currentAva === defaultAva) {
        await User.findByIdAndUpdate(req.params.id, newAva);
        return res.status(200).json("User updated");
      }
    } catch (err) {
      cloudinary.uploader.destroy(fileData.filename);
      return res.status(500).json(err);
    }
  },
};

module.exports = userController;
