const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

/**
 * constants
 */
const DB_URL = process.env.DB;
const PORT = process.env.PORT;
const API = process.env.API;

/**
 * initialise app
 */
const app = express();

/**
 * import routes
 */
const postRoutes = require("./routes/posts");

/**
 * middlewares
 */
app.use(express.json());
app.use(
  morgan(
    '{"date": ":date[iso]", "method": ":method", "url": ":url", "status": ":status", "response-time": ":response-time ms"}'
  )
);

/**
 * routes
 */
app.use(`${API}/posts`, postRoutes);

/**
 * connect to the db
 */
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.info("DB CONNECTED"))
  .catch((err) => console.error(err));

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.info(`Server Running on: http://localhost:${PORT}${API}`);
});
