const express = require("express");
const router = express.Router(/* { mergeParams: true } */);

// Require controllers.
const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");
const { route } = require("./users");

// URL = '/catalog'
 
// GET request for count of all Products.
router.get("/products/count/:category", productController.products_count);

// GET request for count of all Products.
router.get("/products/pages/:category", productController.products_pages);

// GET request for list of all Products.
router.get("/products/:category", productController.products);

router.get("/product/reviews/:id", productController.get_reviews);

// GET request for detail of a specific Product.
router.get("/product/:id", productController.product_detail);

// GET request for redirecting to list of all Products.
router.get("/products", productController.products);


/*
 * Category ROUTES
 */

// GET request for list of all Category.
router.get("/categories", categoryController.categories);

module.exports = router;
