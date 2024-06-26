var express = require('express');
var router = express.Router();

// URL := "/users"

const usersController = require("../controllers/usersController");

// URL = '/supplier'

router.get("/orders", usersController.get_all_orders);

router.get("/orders/product/:status/:id", usersController.get_order_by_product_id);

router.post("/orders/add", usersController.add_order_post);

router.post("/orders/addFromCart", usersController.add_orders_from_cart_post);

router.post("/orders/cancel", usersController.cancel_order_post);

router.get("/orders/:id", usersController.order_details_get);

router.get("/reviews", usersController.get_reviews); 

router.post("/review/add", usersController.add_review_post);

router.post("/review/edit", usersController.edit_review_post);

router.post("/review/delete", usersController.delete_review_post);

router.get("/review/product/:id", usersController.get_review_by_product_id);
  
router.get("/wishlist", usersController.get_wishlist);
 
router.get("/wishlist/:id", usersController.get_wishlist_by_id);

router.post("/wishlist/add", usersController.add_wishlist_post);

router.post("/wishlist/remove", usersController.remove_wishlist_post);

router.post("/update", usersController.update_user_post);

router.post("/delete", usersController.delete_user_post);

router.get("/about", usersController.get_user_about);

module.exports = router;
