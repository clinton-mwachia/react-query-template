/**
 * comments routes
 * http://localhost:8010/api/v0/comments
 */
const express = require("express");
const Comment = require("../models/comments");

/**
 * defining the route
 */
const router = express.Router();

/**
 * add a new comment
 */
router.post("/register", async (req, res) => {
  try {
    /* let comment_exists = await Comment.findOne({ id: req.body.id });
    if (comment_exists) {
      return res.status(400).json({ message: "Comment Id exists" });
    }*/
    let obj = new Comment(req.body);
    const comment = await obj.save();

    if (!comment) {
      return res.status(400).json({ message: "cannot add comment" });
    } else {
      return res.json({
        message: "Comment added",
      });
    }
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
});
/**
 * get all comments
 */
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    if (!comments) {
      return res.status(404).json({ message: "No comments found" });
    } else {
      return res.send(comments);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * get comment by id
 */
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.find({ id: req.params.id });
    if (!comment) {
      return res.status(404).json({ message: "No comment with that id" });
    } else {
      return res.send(comment);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * get comment by post id
 * http://localhost:8010/api/v0/comments/get/post?postId=3
 */
router.get("/get/post", async (req, res) => {
  try {
    const comment = await Comment.find({ postId: req.query.postId }).sort({
      createdAt: -1,
    });
    if (!comment) {
      return res.status(404).json({ message: "No comment with that id" });
    } else {
      return res.send(comment);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * delete comment
 */
router.delete("/:id", async (req, res) => {
  const comment = await Comment.findOneAndRemove({ id: req.params.id });
  try {
    if (comment) {
      return res.status(200).json({ message: "comment deleted" });
    } else {
      return res.status(404).json({ message: "comment not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * update an existing comment by id
 */
router.put(`/:id`, async (req, res) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!comment) {
      return res.status(400).json({ message: "comment cannot be updated" });
    } else {
      return res.status(202).json({ message: "comment updated successfull" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
