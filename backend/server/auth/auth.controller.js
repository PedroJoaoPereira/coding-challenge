const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");
const config = require("../../config/config");

const user = {
  username: "mosano",
  password: "mosano"
};

function login(req, res, next) {
  if (
    req.body.username === user.username &&
    req.body.password === user.password
  ) {
    const token = jwt.sign(
      {
        username: user.username
      },
      config.jwtSecret
    );
    return res.json({
      token,
      username: user.username
    });
  }

  const err = new APIError(
    "Authentication error",
    httpStatus.UNAUTHORIZED,
    true
  );
  return next(err);
}

module.exports = { login };
