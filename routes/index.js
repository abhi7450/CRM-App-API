const express = require("express");
const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {});
require("./auth.routes")(router);
require("./users.route")(router);

module.exports = { router };
