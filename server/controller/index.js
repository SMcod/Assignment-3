let express = require("express");
let router = express.Router();

module.exports.displayHomePage = (req, res, next) => {
  res.render("index", { title: "Home" });
};
module.exports.displayAboutPage = (req, res, next) => {
  res.render("index", {
    title: "About Us",
  });
};

module.exports.displayProductPage = (req, res, next) => {
  res.render("index", {
    title: "Products",
  });
};
/*module.exports.displayWorkoutPage = (req, res, next) => {
  res.render("index", {
    title: "Workout",
  });
};*/

module.exports.displayContactPage = (req, res, next) => {
  res.render("index", {
    title: "Contact",
  });
};
