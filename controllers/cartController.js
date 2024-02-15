let { databaseQuery } = require("../backend/databaseQuery");
let oracledb = require("oracledb");

async function index(req, res, next) {
    const user = req.user;

    try {
        let query = `
        SELECT * 
        FROM CART_ITEM CI
        JOIN PRODUCT PR ON CI.PRODUCT_ID = PR.ID
        WHERE USER_ID = ${user.id}
        `;

        let result = await databaseQuery(query);

        let cartItems = result.rows;

        return res.status(200).json({ cartItems: cartItems });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ errorMessage: "Error in fetching cart items. Please try again." });
    }
}

async function cart_add_product_post(req, res, next) {
    let { product_id, quantity } = req.body;
    const user = req.user;

    let query = `INSERT INTO CART_ITEM (USER_ID, PRODUCT_ID, QUANTITY) VALUES (${user.id}, ${product_id}, ${quantity})`;
    let result = await databaseQuery(query);

    res.send("Product added to cart.");
}

module.exports = {
    index,
    cart_add_product_post,
};
