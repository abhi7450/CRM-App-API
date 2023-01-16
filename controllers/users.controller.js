const User = require("../model/user.model");
const objectConvertor = require("../utils/objectConvertor");

// user,engineer and admin can use this
// search query can be userType,userStatus,userName

const findAll = async (req, res) => {
  const userTypeReq = req.query.userType;
  const userStatusReq = req.query.userStatus;
  const userNameReq = req.query.name;

  let users;
  if (userNameReq) {
    try {
      users = await User.find({
        userName: userNameReq,
      });
    } catch (err) {
      console.err("error while fetching the user for userName : ", userNameReq);
      res.status(500).send({
        message: "Some internal error occured",
      });
    }
  } else if (userTypeReq && userStatusReq) {
    try {
      users = await User.find({
        userType: userTypeReq,
        userStatus: userStatusReq,
      });
    } catch (err) {
      console.err(`error while fetching the user for userType [${userTypeReq}] and userStatus [${userStatusReq}]`);
      res.status(500).send({
        message: "Some internal error occured",
      });
    }
  } else if (userTypeReq) {
    try {
      users = await User.find({
        userType: userTypeReq,
      });
    } catch (err) {
      console.err(`error while fetching the user for userType [${userTypeReq}] `);
      res.status(500).send({
        message: "Some internal error occured",
      });
    }
  } else if (userStatusReq) {
    try {
      users = await User.find({
        userStatus: userStatusReq,
      });
    } catch (err) {
      console.err(`error while fetching the user for userStatus [${userStatusReq}] `);
      res.status(500).send({
        message: "Some internal error occured",
      });
    }
  } else {
    try {
      users = await User.find();
    } catch (err) {
      console.err(`error while fetching the users `);
      res.status(500).send({
        message: "Some internal error occured",
      });
    }
  }
  res.status(200).send(objectConvertor.userResponse(users));
};

const findById = async (req, res) => {
  const userIdReq = req.params.userId;

  const user = await User.find({
    userId: userIdReq,
  });
  if (user) {
    res.status(200).send(objectConvertor.userResponse(user));
  } else {
    res.status(200).send({
      message: `User with this id [${userIdReq}] is not present`,
    });
  }
};

// admin needs to update the user type and status
// localhost:8080/crm/v1/api/users/:userId

const update = async (req, res) => {
  const userIdReq = req.params.userId;
  try {
    let user = await User.findOneAndUpdate(
      {
        userId: userIdReq,
      },
      {
        userName: req.body.userName,
        userStatus: req.body.userStatus,
        userType: req.body.userType,
      }
    ).exec();
    return res.status(200).send({
      message: "User record has been updated successfully.",
    });
  } catch (err) {
    console.log("Error while updating the record", err.message);
    return res.status(500).send({
      message: "Some internal error.",
    });
  }
};

module.exports = {
  findAll,
  findById,
  update,
};
