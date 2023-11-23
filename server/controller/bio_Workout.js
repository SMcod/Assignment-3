let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
//const { router } = require('../config/app');
let Workout = require("../models/Workout");

module.exports.DisplayWorkoutlist = async (req, res, next) => {
  //< Mark function as async
  try {
    const Workoutlist = await Workout.find(); //< Use of await keyword
    res.render("Workout/list", {
      title: "Workout list",
      Workoutlist: Workoutlist,
    });
  } catch (error) {
    console.error(error);
    //Handle error
    res.render("Workout/list", {
      error: "Error on server",
    });
  }
};

module.exports.AddWorkout = (req, res, next) => {
  try {
    res.render("Workout/add", {
      title: "Add Workout",
    });
  } catch (err) {
    console.error(err);
    res.render("Workout/list", {
      error: "Error on the server",
    });
  }
};

module.exports.ProcessWorkout = (req, res, next) => {
  try {
    let newWorkout = Workout({
      Name: req.body.Name,
      weight: req.body.weight,
      sets: req.body.sets,
      reps: req.body.reps,
      time: req.body.time,
    });
    Workout.create(newWorkout).then(() => {
      res.redirect("/bio_Workout");
    });
  } catch (error) {
    console.error(error);
    res.render("Workout/list", {
      error: "Error on the server",
    });
  }
};

module.exports.EditWorkout = async (req, res, next) => {
  try {
    const id = req.params.id;
    const WorkoutToEdit = await Workout.findById(id);
    res.render("Workout/edit", {
      title: "Edit Workout",
      Workout: WorkoutToEdit,
    });
  } catch (error) {
    console.error(err);
    res.render("Workout/list", {
      error: "Error on the server",
    });
  }
};
module.exports.ProcessEditWorkout = (req, res, next) => {
  try {
    const id = req.params.id;
    let updateWorkout = Workout({
      _id: id,
      Name: req.body.Name,
      weight: req.body.weight,
      sets: req.body.sets,
      reps: req.body.reps,
      time: req.body.time,
    });
    Workout.findByIdAndUpdate(id, updateWorkout).then(() => {
      res.redirect("/bio_Workout");
    });
  } catch (err) {
    console.error(err);
    res.render("Workout/list", {
      error: "Error on the server",
    });
  }
};
module.exports.DeleteWorkout = (req, res, next) => {
  try {
    let id = req.params.id;
    Workout.deleteOne({ _id: id }).then(() => {
      res.redirect("/bio_Workout");
    });
  } catch (error) {
    console.error(err);
    res.render("Workout/list", {
      error: "Error on the server",
    });
  }
};
