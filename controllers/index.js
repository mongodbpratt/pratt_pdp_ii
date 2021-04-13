// This entire section was lifted from my express-to-gram file
// inside of controllers/index.js

function index(req, res) {
    console.log("Hi, you visited the index route!");
    console.log(req.user);
  
    let username;
    if (req.user) {
      username = req.user.username;
    } else {
      username = "Please log in";
    }
    res.render("index", { username: username, currentUser: req.user });
    n;
  }
  
  module.exports = {
    index,
  };