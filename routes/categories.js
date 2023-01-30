var express = require("express");
const categoryControler = require("../controllers/categoryController");
var router = express.Router();

/* GET categories listing. */
router.get("/", categoryControler.categoryList);
router.get("/:id", categoryControler.categoryDetail);

router.get("/create", categoryControler.create_get);
router.post("/create", categoryControler.create_post);

router.get("/:id/update", categoryControler.update_get);
router.post("/:id/update", categoryControler.update_post);

router.post("/:id/delete", categoryControler.delete);

module.exports = router;
