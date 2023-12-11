const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const moment = require("moment-timezone");
const { Server } = require("socket.io");
const { createServer } = require("http");
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
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

/**
 * import routes
 */
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");

// Define a custom format function for Morgan
morgan.token("localdatetime", (req, res) => {
  return moment().format("YYYY-MM-DD HH:mm:ss");
});

/**
 * middlewares
 */
app.use(cors());
app.use(express.json());
app.use(
  morgan(
    '{"date": ":localdatetime", "method": ":method", "url": ":url", "status": ":status", "response-time": ":response-time ms"}'
  )
);

/**
 * routes
 */
app.use(`${API}/posts`, postRoutes);
app.use(`${API}/comments`, commentRoutes);

/** real time */
io.on("connection", (socket) => {
  console.log("User Connected!!!");
  io.emit("test", "Hello from test");
  socket.on("disconnect", () => {
    console.log("someone has disconnected");
  });
});

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

httpServer.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.info(`Server Running on: http://localhost:${PORT}${API}`);
});
