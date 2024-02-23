const router = require("express").Router();

const cart_controller = require("../controllers/cartController");

// URL = '/cart'

// GET cart home page.
router.get("/", cart_controller.index);

// POST request to update Cart.
router.post("/add/", cart_controller.cart_add_product_post);

// POST request to update Cart.
router.post("/update/", cart_controller.update_cart_item_quantity_post);

// POST request to remove Cart item.
router.post("/remove/", cart_controller.remove_cart_item_post);

router.get("/test", (req, res, next) => {
    console.log("Cart test Successful");
    return res.json({ message: "Cart test Successful"});
});

module.exports = router;
