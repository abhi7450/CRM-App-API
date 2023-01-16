const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { router } = require("./routes");
const { connectToDb } = require("./utils/connectToDb");
const User = require("./model/user.model");
const constants = require("./utils/constants");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/crm/api/v1", router);
app.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send({
    message: "Yoooo...",
  });
});

const PORT = process.env.PORT || 3000;

async function init() {
  let user = await User.findOne({ userId: "admin" });

  if (user) {
    console.log("Admin user already present", user);
    return;
  } else {
    try {
      let user = await User.create({
        name: "Abhishek",
        userId: "admin",
        email: "abhishek_admin@gmail.com",
        userType: "ADMIN",
        password: bcrypt.hashSync("password", 8),
        userStatus: constants.userStatus.approved,
      });
      console.log(user);
    } catch (err) {
      console.log(err.message);
    }
  }
}

app.listen(PORT, () => {
  console.log(`Listening to PORT: ${PORT}....`);
  connectToDb();
  init();
});
