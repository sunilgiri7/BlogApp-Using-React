const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const http = require("http");
const server = http.createServer(app);

dotenv.config();
app.use(express.json({ limit: "10mb" }));
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => {
  console.log("Backend is running");
});

const io = require("socket.io")(server, {
  pingTimeout: 3000,
  cors: {
    origin: `${process.env.FRONTEND_URL}`,
  },
});

io.on("connection", (socket) => {
  console.log("connected to the socket io");

  socket.on("setup", (userData) => {
    socket.join(userData);
    socket.emit("connected");
  });

  // for sending like
  socket.on("new like", (newLike) => {
    if (!newLike.likes) return console.log("newLike.likes is not defined");

    // socket.broadcast.to(userId).emit("like received", newLike,userId);
    io.emit("like received", newLike);
  });

  socket.on("new unlike", (newLike) => {
    if (!newLike.likes) return console.log("newLike.likes is not defined");
    io.emit("unlike received", newLike);
  });

  // to clean off the socket to save bandwidth.
  socket.on("disconnect", () => {
    console.log("user disconnected");
    socket.leave(userData._id);
  });
});
