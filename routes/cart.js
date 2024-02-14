const router = require("express").Router();

const authenticateToken = require("../middlewares/authMiddleware");
const cart_controller = require("../controllers/cartController");

// URL = '/cart' 

// GET cart home page.
router.get("/", authenticateToken, cart_controller.index);

// POST request to update Cart.
router.post("/add/", cart_controller.cart_add_product_post);

module.exports = router;