let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//connect to model
let Project = require("../models/project");

//Manage routes
router.get("/", (req, res, next) => {
  Project.find((err, projectList) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("project/list", {
        title: "Project Info",
        ProjectList: projectList,
      });
    }
  });
});

// to open add product page
router.get("/add", (req, res, next) => {
  res.render("project/add", { title: "Add Project" });
});

// insert product data into mongoDB collection
router.post("/add", (req, res, next) => {
  //getting data from form
  let newProject = Project({
    title: req.body.ptitle,
    description: req.body.pdescription,
    date: req.body.date,
  });

  //insert data into the mongoDB
  Project.create(newProject, (err, Project) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/projects");
    }
  });
});

router.get("/edit/:id", (req, res, next) => {
  let id = req.params.id;

  Project.findById(id, (err, projectToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //product/edit is a file path
      res.render("project/edit", {
        title: "Edit Project",
        project: projectToEdit,
      });
    }
  });
});

router.post("/edit/:id", (req, res, next) => {
  let id = req.params.id;

  let updatedProject = Project({
    _id: id,
    title: req.body.ptitle,
    description: req.body.pdescription,
    date: req.body.date,
  });

  Project.updateOne({ _id: id }, updatedProject, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/");
    }
  });
});

//write code to store updated data into mongoDB

module.exports = router;
