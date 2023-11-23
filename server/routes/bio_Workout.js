let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
//const { router } = require('../config/app');
//let Book = require("../models/Workout");
const Workout = require("../models/Workout");
let Workoutcontroller = require("../controller/bio_Workout");

/* Get route for the Bio Books list */

// Read Operation
router.get("/", Workoutcontroller.DisplayWorkoutlist);
/* Add operation */
//Get Router For Create Operation --> display the add book page
router.get("/add", Workoutcontroller.AddWorkout);
//Get Router For Create Operation --> process the add book page
router.post("/add", Workoutcontroller.ProcessWorkout);
//Get Router For Edit/Update Operation --> display the edit book page
router.get("/edit/:id", Workoutcontroller.EditWorkout);
//Get Router For Edit/Update Operation --> process the edit book page
router.post("/edit/:id", Workoutcontroller.ProcessEditWorkout);
//Get Router For Delete Operation
router.get("/delete/:id", Workoutcontroller.DeleteWorkout);
module.exports = router;
