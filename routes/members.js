const express = require("express");
const router = express.Router();
const membersController = require("../controllers/membersController");

router.get("/", membersController.index);
router.get("/add", membersController.addForm);
router.post("/add", membersController.create);
router.get("/edit/:id", membersController.editForm);
router.post("/update/:id", membersController.update);
router.get("/delete/:id", membersController.delete);

module.exports = router;
