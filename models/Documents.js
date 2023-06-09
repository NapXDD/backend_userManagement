const mongoose = require("mongoose");

const docsSchema = mongoose.Schema({
  docName: {
    type: String,
    max: 60,
    require: true,
  },
  description: {
    type: String,
    max: 100,
    require: true,
  },
  submitDate: {
    type: String,
  },
  uploadBy: {
    type: String,
    require: true,
  },
  uploaderID: {
    type: String,
    require: true,
  },
  filePath: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("docs", docsSchema);
