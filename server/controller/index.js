let express = require("express");
const passport = require("passport");
let router = express.Router();

let userModel = require("../models/user");
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
  res.render("index", {
    title: "Home",
    displayName: req.user ? req.user.displayName : "",
  });
};
module.exports.displayAboutPage = (req, res, next) => {
  res.render("index", {
    title: "About Us",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.displayProductPage = (req, res, next) => {
  res.render("index", {
    title: "Products",
    displayName: req.user ? req.user.displayName : "",
  });
};
/*module.exports.displayWorkoutPage = (req, res, next) => {
  res.render("index", {
    title: "Workout",
    displayName: req-user ? req.user.displayName: ""
  });
};*/

module.exports.displayContactPage = (req, res, next) => {
  res.render("index", {
    title: "Contact",
    displayName: req.user ? req.user.displayName : "",
  });
};
module.exports.displayLoginPage = (req, res, next) => {
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      message: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};
module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, User, info) => {
    // server error
    if (err) {
      return next(err);
    }
    // it's for login error
    if (!User) {
      req.flash("loginMessage", "AuthenticationError");
      return res.redirect("/login");
    }
    req.login(User, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/bio_Workout");
    });
  })(req, res, next);
};
module.exports.displayRegisterPage = (req, res, next) => {
  // check if the user is not login
  if (!req.user) {
    res.render("auth/register", {
      title: "Register",
      message: req.flash("RegisterMessage"),
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};
module.exports.ProcessRegisterPage = (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    // password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName,
  });
  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: inserting the new user");

      if (err.name == "UserExistsError") {
        req.flash("registerMessage", "Registration Error user Already Exists");
      }
      return res.render("auth/register", {
        title: "Register",
        message: req.flash("registerMessage"),
        displayName: req.user ? req.user.displayName : "",
      });
    } else {
      // if registration is not successful///
      return passport.authenticate("local")(req, res, () => {
        res.redirect("/bio_Workout");
      });
    }
  });
};
module.exports.performLogout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.redirect("/");
};
