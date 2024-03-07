let { databaseQuery } = require("../backend/databaseQuery");
let oracledb = require("oracledb");

// URL : /users/orders
async function get_all_orders(req, res, next) {
    try {
        let query = ` 
                        SELECT * 
                        FROM ORDER_ITEM OIT 
                        JOIN PRODUCT PR
                        ON OIT.PRODUCT_ID = PR.ID
                        JOIN ORDERS ORD
                        ON OIT.ORDER_ID = ORD.ID
                        WHERE ${req.user.id} = (
                            SELECT USER_ID
                            FROM ORDERS
                            WHERE ID = ORDER_ID
                        )
                        ORDER BY ORD.CREATED_AT DESC, ORD.ID ASC
                    `;

        let result = await databaseQuery(query);

        return res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: err.message });
    }
}

// URL : /users/orders/product/:status/:id
async function get_order_by_product_id(req, res, next) {
    let userId = req.user.id;
    try {
        let query = `
                        SELECT *  
                        FROM ORDER_ITEM 
                        WHERE PRODUCT_ID = ${req.params.id} 
                        AND STATUS = '${req.params.status}'
                        AND 
                        ORDER_ID IN 
                        (
                            SELECT ID 
                            FROM ORDERS 
                            WHERE USER_ID = ${userId}
                        )
                    `;
        let result = await databaseQuery(query);

        return res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: err.message });
    }
}

// URL : /users/orders/:id
async function order_details_get(req, res, next) {
    return res.status(200).json({ message: "NOT IMPLEMENTED: order_details_get" });
}

// URL : /users/orders/add
/*
POST http://localhost:3000/users/orders/add
Content-Type: application/json

{
    "productId": 1,
    "quantity": 5
}
*/
async function add_order_post(req, res, next) {
    try {
        let user_id = req.user.id;
        let order_id = null;

        let query = `INSERT INTO ORDERS (USER_ID) VALUES (:userId) RETURNING ID INTO :orderId`;
        let binds = {
            userId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: user_id },
            orderId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        };
        let result = await databaseQuery(query, binds);

        if (result.outBinds.orderId.length === 0) return res.status(500).json({ errorMessage: "Error while adding order" });
        order_id = result.outBinds.orderId[0];

        query = `INSERT INTO ORDER_ITEM (ORDER_ID, PRODUCT_ID, QUANTITY, STATUS) VALUES (:orderId, :productId, :quantity, 'PENDING')`;
        binds = {
            orderId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: order_id },
            productId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: req.body.productId },
            quantity: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: req.body.quantity },
        };

        result = await databaseQuery(query, binds);

        // for (let item of req.body.list) {
        //     const product_id = 0;
        //     const quantity = 0;

        //     query = `INSERT INTO ORDER_ITEM (ORDER_ID, PRODUCT_ID, QUANTITY, STATUS) VALUES (:orderId, :productId, :quantity, 'PENDING')`;
        //     binds = {
        //         orderId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: order_id },
        //         productId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: item.productId },
        //         quantity: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: item.quantity },
        //     };
        //     result = await databaseQuery(query, binds);
        // }

        return res.status(200).json({ message: "Order added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: err.message });
    }
}

// URL : /users/orders/addFromCart
async function add_orders_from_cart_post(req, res, next) {
    try {
        let user_id = req.user.id;
        // let address = req.body.address;

        // let query = `BEGIN ADD_ORDERS_FROM_CART(:userId, :address); END;`;
        let query = `BEGIN ADD_ORDERS_FROM_CART(:userId); END;`;
        let binds = {
            userId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: user_id },
            // address: { dir: oracledb.BIND_IN, type: oracledb.STRING, val: address },
        };

        let result = await databaseQuery(query, binds);

        return res.status(200).json({ message: "Order added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: err.message });
    }
}

// URL : /users/orders/cancel
async function cancel_order_post(req, res, next) {
    try {
        let order_item_id = req.body.orderItemId;
        console.log("Order item id : " + order_item_id);
        let query = `BEGIN :MSG := CANCEL_ORDER_ITEM(:orderItemId); END;`;
        let binds = {
            orderItemId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: order_item_id },
            MSG: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        };
        let result = await databaseQuery(query, binds);

        return res.status(200).json({ message: result.outBinds.MSG });
    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: err.message });
    }
}

// URL : /users/reviews
async function get_reviews(req, res, next) {
    let userId = req.user.id;
    try {
        let query = `SELECT * FROM RATING_REVIEW WHERE USER_ID = :userId`;
        let binds = {
            userId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: userId },
        };
        let result = await databaseQuery(query, binds);

        return res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: err.message });
    }
}

// URL : /users/review/product/:id 
async function get_review_by_product_id(req, res, next) {
    let productId = req.params.id; 
    let userId = req.user.id;
    try {
        let query = `SELECT * FROM RATING_REVIEW WHERE USER_ID = ${userId} AND PRODUCT_ID = ${productId}`;
        let result = await databaseQuery(query);

        return res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: err.message });
    }
}

// URL : /users/review/add
async function add_review_post(req, res, next) {
    try {
        let user_id = req.user.id;
        let { productId, rating, review } = req.body;

        let query = `SELECT * FROM RATING_REVIEW WHERE USER_ID = :userId AND PRODUCT_ID = :productId`;
        let binds = {
            userId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: user_id },
            productId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: productId },
        };
        let result = await databaseQuery(query, binds);

        if (result.rows.length > 0) return res.status(400).json({ errorMessage: "Review already exists" });

        query = `INSERT INTO RATING_REVIEW (USER_ID, PRODUCT_ID, RATING, REVIEW) VALUES (:userId, :productId, :rating, :review)`;
        binds = {
            userId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: user_id },
            productId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: productId },
            rating: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: rating },
            review: { dir: oracledb.BIND_IN, type: oracledb.STRING, val: review },
        };
        result = await databaseQuery(query, binds);

        if (result.rowsAffected === 0) return res.status(500).json({ errorMessage: "Error while adding review" });

        return res.status(200).json({ message: "Review added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: err.message });
    }
}

// URL : /users/review/edit
async function edit_review_post(req, res, next) {
    try {
        let user_id = req.user.id;
        let { reviewId, rating, review } = req.body;

        let query = `SELECT * FROM RATING_REVIEW WHERE USER_ID = :userId AND ID = :reviewId`;
        let binds = {
            userId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: user_id },
            reviewId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: reviewId },
        };
        let result = await databaseQuery(query, binds);

        if (result.rows.length === 0) return res.status(400).json({ errorMessage: "Review does not exist" });

        query = `UPDATE RATING_REVIEW SET RATING = :rating, REVIEW = :review WHERE USER_ID = :userId AND ID = :reviewId`;
        binds = {
            userId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: user_id },
            reviewId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: reviewId },
            rating: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: rating },
            review: { dir: oracledb.BIND_IN, type: oracledb.STRING, val: review },
        };
        result = await databaseQuery(query, binds);

        if (result.rowsAffected === 0) return res.status(500).json({ errorMessage: "Error while editing review" });

        return res.status(200).json({ message: "Review edited successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: err.message });
    }
}

// URL : /users/review/delete
async function delete_review_post(req, res, next) {
    try {
        let user_id = req.user.id;
        let product_id = req.body.productId;

        let query = `SELECT * FROM RATING_REVIEW WHERE USER_ID = :userId AND PRODUCT_ID = :productId`;
        let binds = {
            userId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: user_id },
            productId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: product_id },
        };
        let result = await databaseQuery(query, binds);

        if (result.rows.length === 0) return res.status(400).json({ errorMessage: "Review does not exist" });

        query = `DELETE FROM RATING_REVIEW WHERE USER_ID = :userId AND PRODUCT_ID = :productId`;
        binds = {
            userId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: user_id },
            productId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: product_id },
        };
        result = await databaseQuery(query, binds);

        if (result.rowsAffected === 0) return res.status(500).json({ errorMessage: "Error while deleting review" });

        return res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: err.message });
    }
}

module.exports = {
    get_all_orders,
    get_order_by_product_id,
    add_order_post,
    add_orders_from_cart_post,
    cancel_order_post,
    order_details_get,
    get_reviews,
    add_review_post,
    edit_review_post,
    delete_review_post,
    get_review_by_product_id,
};
