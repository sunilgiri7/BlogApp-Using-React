const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// Create
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  console.log(newPost);
  try {
    console.log("dsjcbjbsa");
    const savedPost = await newPost.save();
    console.log(savedPost);
    res.status(200).json(savedPost);
  } catch (err) {
    console.error(err); // Log the error object for better debugging
    res
      .status(500)
      .json({ message: "An error occurred while saving the post." });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);
    if (post.username === req.body.username) {
      console.log(req.params.id);
      try {
        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json("Post has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all post
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
