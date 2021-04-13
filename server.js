// required modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const { log } = require("mercedlogger");
const methodOverride = require("method-override");
const cors = require("cors");
const connect = ("connect-mongodb-session");
// turning on the app
const app = express();
// telling it which channel to broadcast on, comsec, configuration
const port = 3000
const SECRET = process.env.SECRET || "secret"
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users")
const HomeRouter = require("./routes/home.js");
app.set("view engine", "ejs");
// mounting the middleware
app.use(cors()); // Prevent Cors Errors if building an API
app.use(methodOverride("_method")); // Swap method of requests with _method query
app.use(express.static("public")); // serve the public folder as static
app.use(morgan("tiny")); // Request Logging
app.use(express.json()); // Parse json bodies
app.use(express.urlencoded({ extended: false })); //parse bodies from form submissions
// SESSION MIDDLEWARE REGISTRATION (adds req.session property)
app.use(
  session({
    secret: SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    saveUninitialized: true, // create session regardless of changes
    resave: true, //save regardless of changes
    store: new connect({
      uri: process.env.MONGODB_URL,
      databaseName: "sessions",
      collection: "sessions",
    }),
  })
);






mongoose.connect(
  "mongodb+srv://bread:bread@cluster0.lftso.mongodb.net/property?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Index
app.get("/property", (req, res) => {
  Property.find({}, (error, allProperty) => {
    res.render("index", {
      property: allProperty,
    });
  });
});

// New action
app.get("/property/new", (req, res) => {
  res.render("new");
});

// Delete
app.delete('/property/:id', (req, res)=>{
  Property.findByIdAndRemove(req.params.id, (err, data)=>{
      res.redirect('/property');//redirect back to property index
  });
});

// Update
app.put('/property/:id', (req, res)=>{
  if(req.body.readyToEat === 'on'){
      req.body.readyToEat = true;
  } else {
      req.body.readyToEat = false;
  }
  Property.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel)=>{
    res.redirect("/property");
  });
});

// Create
app.post("/property", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  Property.create(req.body, (error, createdProperty) => {
    console.log(createdProperty);
    res.redirect("/property");
  });
});

// Edit
app.get('/property/:id/edit', (req, res)=>{
  Property.findById(req.params.id, (err, foundProperty)=>{ //find the property
      res.render('edit.ejs', 
      {property: foundProperty,
      });
  });
});

// Show 
app.get('/property/:id', (req, res)=>{
  Property.findById(req.params.id, (error, foundProperty)=>{
    res.render("show", {property: foundProperty});
  });
});

app.listen(3000, () => {
  console.log("Airborne! All the Way!");
});