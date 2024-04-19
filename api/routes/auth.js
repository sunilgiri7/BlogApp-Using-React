const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Configure multer for file upload
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage });

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dijtsdohg",
  api_key: "735669712126625",
  api_secret: "C4Kp_lq4phHENakSojTSFxfkxC8",
});

// Register user with profile picture
router.post("/register", upload.single("profilePic"), async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    let profilePicUrl =
      "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257_640.png"; // Default profile picture URL

    // Check if profile picture is uploaded
    if (req.file) {
      // Upload profile picture to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      profilePicUrl = result.secure_url;
    }

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      profilePic: profilePicUrl,
    });

    // Save user to database
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("dihfdh");
    const user = await User.findOne({ username: req.body.username });
    console.log("fewhof");
    if (!user) {
      return res.status(400).json("Wrong Credentials!");
    }

    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) {
      return res.status(400).json("Wrong Credentials!");
    }

    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
