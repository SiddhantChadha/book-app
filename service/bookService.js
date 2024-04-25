const Book = require("../model/Book");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const createBook = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "Failed", data: errors.array() });
    }

    const { title, publicationYear, genre } = req.body;
    await Book.create({
      author: new mongoose.Types.ObjectId(req.user),
      title,
      publicationYear,
      genre,
    });

    return res.status(201).json({ status: "Success", data: {} });
  } catch (err) {
    return res.status(500).json({ status: "Failed", data: {} });
  }
};

const getBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(new mongoose.Types.ObjectId(bookId));
    if (!book) {
      return res.status(404).json({
        status: "Failed",
        data: { message: "No such resource found" },
      });
    }

    return res.status(200).json(book);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "Failed", data: {} });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const allowedFilters = ["publicationYear", "author", "genre"];
    let filterObj = {};

    allowedFilters.forEach((filter) => {
      if (req.query.hasOwnProperty(filter)) {
        filterObj[filter] = req.query[filter];
      }
    });
    const books = await Book.find(filterObj);

    return res.status(200).json({ status: "Success", data: books });
  } catch (err) {
    return res.status(500).json({ status: "Failed", data: {} });
  }
};

const updateBook = async (req, res) => {
  const bookId = req.params.bookId;
  const { title, publicationYear, genre } = req.body;

  try {
    let book = await Book.findById(new mongoose.Types.ObjectId(bookId));
    if (!book.author.equals(new mongoose.Types.ObjectId(req.user.id))) {
      return res.status(401).json({
        status: "Failed",
        data: { message: "You do not have access to this resource" },
      });
    }

    if (title) book.title = title;
    if (publicationYear) book.publicationYear = publicationYear;
    if (genre) book.genre = genre;

    await book.save();
    return res.status(200).json({ status: "Success", data: book });
  } catch (err) {
    return res.status(500).json({ status: "Failed", data: {} });
  }
};

const deleteBook = async (req, res) => {
  const bookId = req.params.bookId;

  try {
    let book = await Book.findById(new mongoose.Types.ObjectId(bookId));
    if (!book.author.equals(new mongoose.Types.ObjectId(req.user.id))) {
      return res.status(401).json({
        status: "Failed",
        data: { message: "You do not have access to this resource" },
      });
    }

    await book.deleteOne();
    return res.status(200).json({ status: "Success", data: {} });
  } catch (err) {
    return res.status(500).json({ status: "Failed", data: {} });
  }
};

module.exports = {
  createBook,
  getBook,
  getAllBooks,
  updateBook,
  deleteBook,
};
