const Category = require("../models/category");

exports.categoryList = (req, res, next) => {
  Category.find({})
    .sort({ name: 1 })
    .exec(function (err, categoryList) {
      if (err) {
        return next(err);
      }
      res.render("categoryList", { title: "Category List", categoryList });
    });
};
