var express = require("express");
const itemController = require('../controllers/itemController')
var router = express.Router();

/* GET items listing. */
router.get("/", itemController.itemList);

module.exports = router;
