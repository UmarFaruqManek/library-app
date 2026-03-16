const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksController");

router.get("/", booksController.getAllBooks);
router.get("/add", booksController.addForm);
router.post("/add", booksController.createBook);
router.get("/edit/:id", booksController.editForm);
router.post("/update/:id", booksController.updateBook);
router.get("/delete/:id", booksController.deleteBook);

module.exports = router;
