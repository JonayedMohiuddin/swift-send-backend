const router = require("express").Router();

const admin_controller = require("../controllers/adminController");

// URL = '/admin'

router.get("/", admin_controller.index);

router.post("/addCategory", admin_controller.add_category_post);

router.post("/removeCategory", admin_controller.remove_category_post);

router.post("/updateCategory", admin_controller.update_category_post);

router.post("/orders/delivered/:id", admin_controller.deliver_order_post);

router.get("/orders/:status", admin_controller.get_orders);

router.get("/suppliers", admin_controller.get_suppliers);

router.post("/removeSupplier/:id", admin_controller.remove_supplier);

router.get("/test", (req, res, next) => {
    console.log("Admin test Successful");
    return res.json({ message: "Admin test Successful"});
});

module.exports = router;
