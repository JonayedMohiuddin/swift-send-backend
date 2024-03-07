let { databaseQuery } = require("../backend/databaseQuery");
let oracledb = require("oracledb");

async function index(req, res, next) {
    const user = req.user;

    try {
        let query = `
        SELECT  
        CI.ID AS CART_ITEM_ID, 
        CI.USER_ID,
        CI.PRODUCT_ID,
        CI.QUANTITY,

        PR.ID AS PRODUCT_ID,
        PR.SUPPLIER_ID, 
        PR.CATEGORY_ID,
        PR.NAME AS PRODUCT_NAME,
        PR.PRICE,
        PR.IMAGE_URL,
        PR.DISCOUNT,

        S.NAME AS SUPPLIER_NAME

        FROM CART_ITEM CI
        JOIN PRODUCT PR ON CI.PRODUCT_ID = PR.ID
        JOIN SUPPLIER S ON PR.SUPPLIER_ID = S.ID
        WHERE USER_ID = ${user.id}
        ORDER BY S.NAME ASC, PR.NAME ASC
        `;

        let result = await databaseQuery(query);
        let cartItems = result.rows;

        return res.status(200).json({ cartItems: cartItems });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ errorMessage: "Error in fetching cart items. Please try again." });
    }
}

//`INSERT INTO CART_ITEM (USER_ID, PRODUCT_ID, QUANTITY) VALUES (${user.id}, ${product_id}, ${quantity})`;

async function cart_add_product_post(req, res, next) {
    let { product_id, quantity } = req.body;
    const user = req.user;

    try {
        let query = `SELECT * FROM USERS WHERE ID = ${user.id}`;
        let result = await databaseQuery(query);

        if(!result.rows.length) {
            console.log("User not found " + req.user.id);
            throw new Error();
        }

        query = `
        BEGIN 
            ADD_OR_UPDATE_CART_ITEM(${user.id}, ${product_id}, ${quantity}); 
        END;`;
        
        result = await databaseQuery(query);

        if(!result || result.rowsAffected === 0) {
            throw new Error();
        }

        res.status(200).json({ successMessage: "Product added to cart successfully." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ errorMessage: "Error in adding product to cart. Please try again." });
    }
}

async function update_cart_item_quantity_post(req, res, next) {
    let { cart_item_id, quantity } = req.body;

    console.log("cart_item_id: " + cart_item_id);
    console.log("quantity: " + quantity);

    try {
        let query = `UPDATE CART_ITEM SET QUANTITY = ${quantity} WHERE ID = ${cart_item_id}`;
        let result = await databaseQuery(query);

        res.status(200).json({ successMessage: "Cart item quantity updated successfully." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ errorMessage: "Error in updating cart item quantity. Please try again." });
    }
}

async function remove_cart_item_post(req, res, next) {
    let { cart_item_id } = req.body;

    try {
        let query = `DELETE FROM CART_ITEM WHERE ID = ${cart_item_id}`;
        let result = await databaseQuery(query);

        res.status(200).json({ successMessage: "Cart item removed successfully." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ errorMessage: "Error in removing cart item. Please try again." });
    }
}

module.exports = {
    index,
    cart_add_product_post,
    update_cart_item_quantity_post,
    remove_cart_item_post,
};
