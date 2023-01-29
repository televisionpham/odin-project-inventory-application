const Item = require("../models/item");
const Category = require("../models/category");

exports.itemList = (req, res, next) => {
  Item.find({})
    .sort({ name: 1 })
    .populate("category")
    .exec(function (err, listItems) {
      if (err) {
        return next(err);
      }
      console.log(listItems);
      res.render("itemList", { title: "Item List", itemList: listItems });
    });
};
