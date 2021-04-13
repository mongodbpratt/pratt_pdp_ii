// This entire section was lifted from my express-to-gram file
require("dotenv").config();

const mongoose = require("mongoose");

const connectionURI = process.env.MONGODB_URI;

// shortcut to mongoose.connection object
const db = mongoose.connection;

mongoose.connect(connectionURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

db.on("connected", function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
