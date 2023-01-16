const jwt = require("jsonwebtoken");
const configs = require("../configs/auth.config");
const User = require("../model/user.model");
const constants = require("../utils/constants");

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No Token Provided",
    });
  }
  jwt.verify(token, configs.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!!",
      });
    }
    req.userId = decoded.id;
    console.log(req.userId);
    next();
  });
};

const isAdmin = async (req, res, next) => {
  // find the user from the DB using the userId
  console.log("isAdmin", req.userId);
  const user = await User.findOne({
    userId: req.userId,
  });
  console.log(user);
  if (user && user.userType == constants.userTypes.admin) {
    next();
  }
  //TODO: if userStatus pending
  else {
    res.status(403).send({
      message: "Require Admin Role!",
    });
    return;
  }
};

module.exports = {
  verifyToken,
  isAdmin,
};
