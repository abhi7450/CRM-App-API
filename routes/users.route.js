const { findAll } = require("../controllers/users.controller");
const { isAdmin, verifyToken } = require("../middlewares/authjwt");

module.exports = (router) => {
  router.get("/users", [verifyToken, isAdmin], findAll);
};
