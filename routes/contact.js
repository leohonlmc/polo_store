let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//connect to model
let Contact = require("../models/contact");

// to open add product page
router.get("/add", (req, res, next) => {
  res.render("contact/add", { title: "Add Contact" });
});

// insert product data into mongoDB collection
router.post("/add", (req, res, next) => {
  //getting data from form
  let newContact = Contact({
    name: req.body.pname,
    phone: req.body.phone,
  });

  //insert data into the mongoDB
  Contact.create(newContact, (err, Contact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/contact");
    }
  });
});

//write code to store updated data into mongoDB

module.exports = router;
