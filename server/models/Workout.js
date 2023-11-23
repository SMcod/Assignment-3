let mongoose = require("mongoose");

// create a model class
let WorkoutModel = mongoose.Schema(
  {
    Name: String,
    weight: mongoose.Schema.Types.Mixed,
    sets: mongoose.Schema.Types.Mixed,
    reps: mongoose.Schema.Types.Mixed,
    time: mongoose.Schema.Types.Mixed,
  },
  {
    collection: "Workout",
  }
);
module.exports = mongoose.model("Workout", WorkoutModel);
