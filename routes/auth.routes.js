const authController = require("../controllers/auth.controller.js");

// /crm/api/auth/signup
// /crm/api/auth/signin

module.exports = (router) => {
  router.post("/signup", authController.signup);
  router.post("/signin", authController.signin);
};
