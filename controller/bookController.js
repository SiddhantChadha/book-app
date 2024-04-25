const express = require("express");
const router = express.Router();
const {
  createBook,
  getBook,
  updateBook,
  deleteBook,
  getAllBooks,
} = require("../service/bookService");
const { body } = require("express-validator");

/**
 * @openapi
 * '/api/books/{bookId}':
 *  get:
 *     tags:
 *     - Book Controller
 *     summary: Get a Book
 *     parameters:
 *     — in: path
 *     name: bookId
 *     required: true
 *     description: ID of the resource to retrieve.
 *     responses:
 *      200:
 *        description: Success
 *      500:
 *        description: Server Error
 */
router.get("/:bookId", getBook);

/**
 * @openapi
 * '/api/books/{bookId}':
 *  delete:
 *     tags:
 *     - Book Controller
 *     summary: Delete a Book
 *     parameters:
 *     — in: path
 *     name: bookId
 *     required: true
 *     description: ID of the resource to retrieve.
 *     schema:
 *     type: string
 *     responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Access Denied
 *      500:
 *        description: Server Error
 */
router.delete("/:bookId", deleteBook);

/**
 * @openapi
 * '/api/books':
 *  patch:
 *     tags:
 *     - Book Controller
 *     summary: Update a book
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - genre
 *              - title
 *              - publicationYear
 *            properties:
 *              genre:
 *                type: string
 *                default: Horror
 *              title:
 *                type: string
 *                default: FirstBook
 *              publicationYear:
 *                type: number
 *                default: 2024
 *     responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Access Denied
 *      500:
 *        description: Server Error
 */

router.patch("/:bookId", updateBook);

/**
 * @openapi
 * '/api/books':
 *  post:
 *     tags:
 *     - Book Controller
 *     summary: Create a book
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - genre
 *              - title
 *              - publicationYear
 *            properties:
 *              genre:
 *                type: string
 *                default: Horror
 *              title:
 *                type: string
 *                default: FirstBook
 *              publicationYear:
 *                type: number
 *                default: 2024
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
router.post(
  "/",
  [
    body("genre").notEmpty(),
    body("title").notEmpty(),
    body("publicationYear").notEmpty().isNumeric(),
  ],
  createBook
);

/**
 * @openapi
 * '/api/books':
 *  get:
 *     tags:
 *     - Book Controller
 *     summary: Get all Books. Supports filtering keys author,genre,publicationYear
 *     responses:
 *      201:
 *        description: Created
 *      500:
 *        description: Server Error
 */
router.get("/", getAllBooks);

module.exports = router;
