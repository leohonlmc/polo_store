let mongoose = require("mongoose");

//Create Model of Product
let contactModel = mongoose.Schema(
  {
    name: String,
    phone: Number,
  },
  {
    collection: "contact",
  }
);

module.exports = mongoose.model("Contact", contactModel);
