const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const tokenHeader = req.header("Authorization");

  if (!tokenHeader) {
    return res
      .status(401)
      .send({ status: "Failed", data: { message: "Acess Denied" } });
  }

  try {
    const token = tokenHeader.split(" ")[1];
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = verified;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ status: "Failed", data: { message: "Invalid Token" } });
  }
};

module.exports = {
  verifyToken,
};
