var express = require('express');
var router = express.Router();

// URL := "/users"

const usersController = require("../controllers/usersController");

// URL = '/supplier'

router.get("/orders", usersController.get_all_orders);

router.post("/orders/add", usersController.add_order_post);

router.post("/orders/cancel", usersController.cancel_order_post);

router.get("/orders/:id", usersController.order_details_get);

module.exports = router;
