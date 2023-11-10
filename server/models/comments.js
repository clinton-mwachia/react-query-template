/**
 * comments model schema
 */
const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    postId: {
      type: Number,
    },
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    body: {
      type: String,
    },
  },
  { timestamps: true }
);

Comment = mongoose.model("comments", commentSchema);

module.exports = Comment;
