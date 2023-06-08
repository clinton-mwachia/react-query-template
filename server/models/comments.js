/**
 * comments model schema
 */
const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  postId: {
    type: Number,
  },
  id: {
    type: Number,
    index: { unique: true, dropDups: true },
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
});

Comment = mongoose.model("comments", commentSchema);

module.exports = Comment;
