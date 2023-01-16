const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const constants = require("../utils/constants");
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");

// For Registration

exports.signup = async (req, res) => {
  let userStatus = req.body.userStatus;
  if (!req.body.userStatus) {
    if (!req.body.userType || req.body.userType == constants.userTypes.customer) {
      userStatus = constants.userStatus.approved;
    } else {
      userStatus = constants.userStatus.pending;
    }
  }
  const userIdRes = req.body.name + Math.ceil(Math.random() * 1000);
  const userObj = {
    name: req.body.name,
    userId: userIdRes,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  };

  try {
    const userCreated = await User.create(userObj);
    const postResponse = {
      name: userCreated.name,
      userId: userCreated.userId,
      email: userCreated.email,
      userType: userCreated.userType,
      userStatus: userCreated.userStatus,
    };
    res.status(200).send(postResponse);
  } catch (err) {
    console.log("Some error while creating DB:", err.message);
    res.status(500).send({
      message: "Some internal error while adding data..",
    });
  }
};

// For Logins

exports.signin = async (req, res) => {
  // find the data from DB using email
  const user = await User.findOne({ email: req.body.email });
  // if not found send a message and ask for them to signup then return
  if (!user) {
    res.status(200).send({
      message: "You dont have any account with us.Please sign up.",
    });
    return;
  }
  // if the user is approved or not
  if (user.userStatus != constants.userStatus.approved) {
    console.log(user);
    return res.status(401).send({
      message: "You have not been approved by the Admin",
    });
  }

  // if present check for valid password
  let vaildPassword = bcrypt.compareSync(req.body.password, user.password);
  if (!vaildPassword) {
    return res.status(401).send({
      message: "Invalid Password",
    });
  }
  let token = jwt.sign({ id: user.userId }, config.secret, { expiresIn: 86400 });
  const postResponse = {
    name: user.name,
    userId: user.userId,
    email: user.email,
    userType: user.userType,
    userStatus: user.userStatus,
    accessToken: token,
  };
  res.status(200).send(postResponse);
};
