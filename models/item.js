const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  numberInStock: {
    type: Number,
    min: 0,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

ItemSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
