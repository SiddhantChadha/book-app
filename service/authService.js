const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const signup = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "Failed", data: errors.array() });
    }

    const { email, password, name } = req.body;
    const userExists = await User.exists({ email: email });

    if (userExists) {
      return res.status(409).json({
        status: "Failed",
        data: { message: "Email already registered" },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword, name });

    return res.status(201).json({ status: "Success", data: {} });
  } catch (err) {
    return res.status(500).json({ status: "Failed", data: {} });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: "Failed", data: { message: "Email not found" } });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ status: "Failed", data: { message: "Incorrect Password" } });
    }

    const access_token = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const responseObj = {
      _id: user._id,
      email: user.email,
      access_token,
      token_type: "Bearer",
    };

    return res.status(200).json({ status: "Success", data: responseObj });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "Failed", data: {} });
  }
};

module.exports = {
  signup,
  login,
};
