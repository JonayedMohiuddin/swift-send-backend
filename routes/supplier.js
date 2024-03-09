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

router.post("/restoreProduct", supplierController.restore_product_post);

// POST request to update Supplier.
router.post("/updateProduct", supplierController.update_product_post);

router.get("/orders/:status", supplierController.get_all_orders_status);

router.get("/orders", supplierController.get_all_orders);

router.post("/orders/shipped/:supplierOrderId", supplierController.ship_product_post);

router.get("/about", supplierController.supplier_about_get);

router.post("/update", supplierController.update_about_post);

router.post("/remove", supplierController.remove_supplier_post);

module.exports = router;
