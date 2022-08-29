const express = require("express");
const router = express.Router();
const {validateCreateBook, validateUpdateBook, getAllBooks, createBook, getBook, updateBook, deleteBook} = require("../controllers/book.controller");

router.route("/api/book")
    .get(getAllBooks)
    .post(validateCreateBook, createBook);

router.route("/api/book/:bookId")
    .get(getBook)
    .put(validateUpdateBook, updateBook)
    .delete(deleteBook);

module.exports = router;