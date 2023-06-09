/**
 * posts routes
 * http://localhost:8010/api/v0/posts
 */
const express = require("express");
const Post = require("../models/posts");
const mongoose = require("mongoose");

/**
 * defining the route
 */
const router = express.Router();

/**
 * add a new post
 */
router.post("/register", async (req, res) => {
  try {
    let post_exists = await Post.findOne({ id: req.body.id });
    if (post_exists) {
      return res.json({ message: "Post Id exists" });
    }
    let obj = new Post(req.body);
    const post = await obj.save();

    if (!post) {
      return res.status(400).json({ message: "cannot add post" });
    } else {
      return res.json({
        message: "Post added",
      });
    }
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
});

/**
 * get all posts
 */
router.get("/", async (req, res) => {
  const { page, limit } = req.query;
  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 10;
  try {
    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / pageSize);

    const posts = await Post.find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    if (!posts) {
      return res.status(404).json({ message: "No posts found" });
    } else {
      return res.send({
        totalPages: totalPages,
        data: posts,
        hasMore: page < totalPages,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * get post by id
 */
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.find({ id: req.params.id });
    if (!post) {
      return res.status(404).json({ message: "No post with that id" });
    } else {
      return res.send(post);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * get post by user id
 * http://localhost:8010/api/v0/posts/get/user?userId=3
 */
router.get("/get/user", async (req, res) => {
  try {
    const post = await Post.find({ userId: req.query.userId });
    if (!post) {
      return res.status(404).json({ message: "No post with that id" });
    } else {
      return res.send(post);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * delete post
 */
router.delete("/:id", async (req, res) => {
  const post = await Post.findOneAndRemove({ id: req.params.id });
  try {
    if (post) {
      return res.status(200).json({ message: "post deleted" });
    } else {
      return res.status(404).json({ message: "post not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * update an existing post by id
 */
router.put(`/:id`, async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(400).json({ message: "post cannot be updated" });
    } else {
      return res.status(202).json({ message: "post updated successfull" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
