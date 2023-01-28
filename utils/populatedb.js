#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith("mongodb")) {
  console.log(
    "ERROR: You need to specify a valid mongodb URL as the first argument"
  );
  return;
}

const async = require("async");
const Category = require("../models/category");
const Item = require("../models/item");

const mongoose = require("mongoose");
const category = require("../models/category");
mongoose.set("strictQuery", false);
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const categories = [];
const items = [];

function categoryCreate(name, description, cb) {
  const _category = {
    name,
    description,
  };

  const category = new Category(_category);
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log("New Category: ", category);
    categories.push(category);
    cb(null, category);
  });
}

function itemCreate(name, description, price, numberInStock, category, cb) {
  const _item = {
    name,
    description,
    price,
    numberInStock,
    category,
  };

  console.log(_item);

  const item = new Item(_item);
  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log("New Item:", item);
    items.push(item);
    cb(null, item);
  });
}

function createCategories(cb) {
  async.parallel(
    [
      function (callback) {
        categoryCreate("Smartphone", "", callback);
      },
      function (callback) {
        categoryCreate("Laptop", "", callback);
      },
    ],
    cb
  );
}

function createItems(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate("Samsung Glaxy S8", "", 450, 100, categories[0], callback);
      },
      function (callback) {
        itemCreate("Iphone X", "", 1000, 50, categories[0], callback);
      },
      function (callback) {
        itemCreate("Panasonic CF-SX2", "", 250, 1, categories[1], callback);
      },
      function (callback) {
        itemCreate("MSI GF65", "", 1500, 10, categories[1], callback);
      },
    ],
    cb
  );
}

async.series([createCategories, createItems], function (err, results) {
  if (err) {
    console.log("FINAL ERR: " + err);
  } else {
    console.log("Items: " + items);
  }
  // All done, disconnect from database
  mongoose.connection.close();
});
