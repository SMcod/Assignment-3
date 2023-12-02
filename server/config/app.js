let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
var router = express.Router();
let session = require("express-session");
let passport = require("passport");
let passportlocal = require("passport-local");
let localStrategy = passportlocal.Strategy;
let flash = require("connect-flash");

let app = express();
// create a user model instance
let userModel = require("../models/user");
let User = userModel.User;
// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../../node_modules")));

let mongoose = require("mongoose");
let mongoDB = mongoose.connection;
let DB = require("./db");
//mongoose.connect('mongodb://127.0.0.1:27017/BookLib');
mongoose.connect(DB.URI);
mongoDB.on("error", console.error.bind(console, "Connection Error"));
mongoDB.once("open", () => {
  console.log("Mongo DB is connected");
});
//set-up express session
app.use(
  session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false,
  })
);

// initialize flash
app.use(flash());
// implement a user for auth//
passport.use(User.createStrategy());
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// serialize and desrialize the user information
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//mongoose.connect(DB.URI);
let indexRouter = require("../routes/index");
let usersRouter = require("../routes/user");
let WorkoutRouter = require("../routes/bio_Workout");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/bio_Workout", WorkoutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Error" });
});

module.exports = app;
