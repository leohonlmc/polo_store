let mongoose = require("mongoose");

//Create Model of Product
let projectModel = mongoose.Schema(
  {
    title: String,
    description: String,
    date: Date,
  },
  {
    collection: "project",
  }
);

module.exports = mongoose.model("Project", projectModel);
