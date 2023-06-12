const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js");
const postsRoute = require("./routes/posts.js");
const meetingRoute = require("./routes/meeting.js");
const docsRoute = require("./routes/documents.js");
const uploadRoute = require("./routes/upload.js");

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("CONNECTED TO MONGO DB");
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/posts", postsRoute);
app.use("/v1/meeting", meetingRoute);
app.use("/v1/docs", docsRoute);
app.use("/upload", uploadRoute);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
