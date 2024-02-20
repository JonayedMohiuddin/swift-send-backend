const router = require("express").Router();

const supplierController = require("../controllers/supplierController");

// URL = '/supplier'

router.get("/details", supplierController.supplier_details_get);

// POST request to update Supplier.
router.post("/add/", supplierController.add_product_post);

// POST request to remove Supplier item.
router.post("/remove/", supplierController.remove_product_post);

// POST request to update Supplier.
router.post("/update/", supplierController.update_product_post);

module.exports = router;
