var express = require("express");
const categoryControler = require("../controllers/categoryController");
var router = express.Router();

/* GET categories listing. */
router.get("/", categoryControler.categoryList);

module.exports = router;
