let { databaseQuery } = require("../backend/databaseQuery");
let oracledb = require("oracledb");

async function index(req, res, next) {
    let query = `SELECT * FROM ORDERS JOIN PRODUCT ON ORDERS.PRODUCT_ID = PRODUCT.ID ORDER BY PLACED_AT DESC`;
    let result = await databaseQuery(query, {});

    console.log("Cart page. Orders:", result.rows);

    res.render("cart", { title: "Cart" , cart: result.rows});
}

async function cart_add_product_post(req, res, next) {
    let { product_id, quantity } = req.body;

    console.log("Add to cart button clicked. Product ID:", product_id);

    let query = `INSERT INTO ORDERS (CART_ID, PRODUCT_ID, PHONE_1, QUANTITY, PLACED_AT) VALUES (1, :product_id, '012', :quantity, SYSDATE)`;
    let params = {
        product_id: { val: product_id },
        quantity: { val: quantity }
    };
    let result = await databaseQuery(query, params);

    res.send("Product added to cart.");
}

module.exports = {
    index,
    cart_add_product_post,
};
