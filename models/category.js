const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
});

CategorySchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/category/${this._id}`;
  });
  

module.exports = mongoose.model("Category", CategorySchema);
