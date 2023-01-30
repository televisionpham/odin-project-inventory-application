const Category = require("../models/category");
const Item = require("../models/item");

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

exports.categoryDetail = (req, res, next) => {
  Category.findById(req.params.id).exec(function (err, category) {
    if (err) {
      return next(err);
    }

    Item.find({ category: category }).exec(function (err, itemList) {
      if (err) {
        return next(err);
      }

      res.render("categoryDetail", { category, itemList });
    });
  });
};

exports.create_get = (req, res, next) => {
  res.render("categoryCreate");
};

exports.create_post = (req, res, next) => {
  const categoryDetail = {
    name: req.body.name,
    description: req.body.description,
  };

  const category = new Category(categoryDetail);
  category.save(function (err) {
    if (err) {
      return next(err);
    }

    res.redirect("/category");
  });
};

exports.update_get = (req, res, next) => {
  Category.findById(req.params.id).exec(function (err, category) {
    if (err) {
      return next(err);
    }
    res.render("categoryUpdate", { category });
  });
};

exports.update_post = (req, res, next) => {
  const categoryDetail = {
    name: req.body.name,
    description: req.body.description,
  };
  Category.findByIdAndUpdate(req.params.id, categoryDetail).exec(function (
    err
  ) {
    if (err) {
      return next(err);
    }

    res.redirect("/category");
  });
};

exports.delete = (req, res, next) => {
  Category.findByIdAndRemove(req.params.id).exec(function (err) {
    if (err) {
      return next(err);
    }

    res.redirect("/category");
  });
};
