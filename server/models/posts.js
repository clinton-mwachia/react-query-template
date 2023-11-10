/**
 * posts model schema
 */
const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: {
      type: Number,
    },
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
  },
  { timestamps: true }
);

Post = mongoose.model("posts", postSchema);

module.exports = Post;
