const express = require("express");
const router = express.Router();
const { signup, login } = require("../service/authService");
const { body } = require("express-validator");

/**
 * @openapi
 * '/api/auth/signup':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *            properties:
 *              name:
 *                type: string
 *                default: johndoe
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server Error
 */
router.post(
  "/signup",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").notEmpty().isLength({ min: 6 }),
  ],
  signup
);

/**
 * @openapi
 * '/api/auth/login':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Login user and obtain access token
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty().isLength({ min: 6 })],
  login
);

module.exports = router;
