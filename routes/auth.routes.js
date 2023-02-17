const router = require("express").Router();
const { SignUpController, LoginController } = require('../controller/auth.controller')
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.post("/signup", SignUpController)
router.post("/login", LoginController)


router.get("/verify", isAuthenticated, (req, res, next) => {
  res.status(200).json(req.payload);
});

module.exports = router;