/**
 * posts model schema
 */
const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  userId: {
    type: Number,
  },
  id: {
    type: Number,
    index: { unique: true, dropDups: true },
  },
  title: {
    type: String,
  },
  body: {
    type: String,
  },
});

Post = mongoose.model("posts", postSchema);

module.exports = Post;
