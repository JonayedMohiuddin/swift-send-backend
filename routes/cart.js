const router = require("express").Router();

const authenticateToken = require("../middlewares/authMiddleware");
const cart_controller = require("../controllers/cartController");

// URL = '/cart'

// GET cart home page.
router.get("/", cart_controller.index);

// POST request to update Cart.
router.post("/add/", cart_controller.cart_add_product_post);

router.get("/test", (req, res, next) => {
    console.log("Cart test Successful");
    return res.json({ message: "Cart test Successful"});
});

module.exports = router;
