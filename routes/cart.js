const express = require("express");
const router = express.Router(/* { mergeParams: true } */);

// Require controllers.
const cart_controller = require("../controllers/cartController");

// URL = '/cart' 

/*
 * CART ROUTES 
 */

// GET cart home page.
router.get("/", cart_controller.index);

// POST request to update Cart.
router.post("/add/", cart_controller.cart_add_product_post);

module.exports = router;