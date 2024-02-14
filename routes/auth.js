const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/signup", authController.signup);
// router.post("/changepass", authMiddleware, authController.changePass);
// router.post("/forgot_pass", authController.sendResetMail);
// router.post("/reset_pass", authController.resetPass);
module.exports = router;
