const express = require("express");
const router = express.Router(/* { mergeParams: true } */);

// Require controllers.
const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");

// URL = '/catalog' 

/*
 * PRODUCT ROUTES 
 */

// GET catalog home page.
router.get("/", productController.index);

// GET request for list of all Book.
router.get("/products", productController.products);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/product/create", productController.product_create_get);

// POST request for creating Book.
router.post("/product/create", productController.product_create_post);

// GET request to delete Book.
router.get("/product/:id/delete", productController.product_delete_get);

// POST request to delete Book.
router.post("/product/:id/delete", productController.product_delete_post);

// GET request to update Book.
router.get("/product/:id/update", productController.product_update_get);

// POST request to update Book.
router.post("/product/:id/update", productController.product_update_post);

// GET request for one Book.
router.get("/product/:id", productController.product_detail);


/*
 * Category ROUTES 
 */

// GET request for creating a Category. NOTE This must come before route that displays Category (uses id).
router.get("/category/create", categoryController.category_create_get);

// POST request for creating Category.
router.post("/category/create", categoryController.category_create_post);

// GET request to delete Category.
router.get("/category/:id/delete", categoryController.category_delete_get);

// POST request to delete Category.
router.post("/category/:id/delete", categoryController.category_delete_post);

// GET request to update Category.
router.get("/category/:id/update", categoryController.category_update_get);

// POST request to update Category.
router.post("/category/:id/update", categoryController.category_update_post);

// GET request for one Category.
router.get("/category/:id", categoryController.category_detail);

// GET request for list of all Category.
router.get("/categorys", categoryController.categories);


module.exports = router;