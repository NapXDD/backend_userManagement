const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            min: 3,
            max: 60,
            require: true
        },
        content: {
            type: String,
            min: 1,
            max: 500,
            require: true
        },
        author: {
            type: String,
            require: true,
            max: 50,
        },
        uploadDate: {
            type: String,
            require: true,
            max: 50
        }
    }
)

module.exports = mongoose.model("posts", postsSchema);