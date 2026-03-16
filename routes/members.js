const express = require("express");
const router = express.Router();
const membersController = require("../controllers/membersController");

router.get("/", membersController.index);
router.get("/add", membersController.addForm);
router.post("/add", membersController.create);

module.exports = router;
