let { databaseQuery } = require("../backend/databaseQuery");
let oracledb = require("oracledb");

async function get_all_orders(req, res, next) {
    res.send("NOT IMPLEMENTED: get_all_orders");
}

async function order_details_get(req, res, next) {
    const id = req.params.id;
    res.send("NOT IMPLEMENTED: order_details_get, id: " + id );
} 
 
async function add_order_post(req, res, next) {
    const list = req.body.list;
    for(let item of list) {
        const user_id = item.userId;
        const product_id = item.productId;
        const quantity = item.quantity;
        console.log("Item number " + list.indexOf(item));
        console.log("User id: " + user_id);
        console.log("Product id: " + product_id);
        console.log("Quantity: " + quantity);
    }

    res.send("NOT IMPLEMENTED: add_order_post");
}

async function cancel_order_post(req, res, next) {
    res.send("NOT IMPLEMENTED: cancel_order_post");
}


module.exports = {
    get_all_orders,
    add_order_post,
    cancel_order_post,
    order_details_get,
};