const posts = require('../models/Posts')
const bcrypt = require("bcrypt");

const postsController = {
    getAllPosts: async (req, res) => {
        try{ 
            const posts = await User.find();
            res.status(200).json(user);
        }
        catch(err){
            res.status(200).json(err);
        }
    }
}