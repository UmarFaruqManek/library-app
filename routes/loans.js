const express = require("express");
const router = express.Router();
const loansController = require("../controllers/loansController");

router.get("/", loansController.index);
router.get("/add", loansController.addForm);
router.post("/add", loansController.create);
router.get("/details/:id", loansController.details);

module.exports = router;
