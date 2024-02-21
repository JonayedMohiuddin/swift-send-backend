const router = require("express").Router();

const supplierController = require("../controllers/supplierController");

// URL = '/supplier'

router.get("/all", supplierController.supplier_all_get);

router.get("/products", supplierController.supplier_products_get);

router.get("/details", supplierController.supplier_details_get);

// POST request to update Supplier.
router.post("/addProduct", supplierController.add_product_post);

// POST request to remove Supplier item.
router.post("/removeProduct", supplierController.remove_product_post);

// POST request to update Supplier.
router.post("/updateProduct", supplierController.update_product_post);

module.exports = router;