let { databaseQuery } = require("../backend/databaseQuery");
let oracledb = require("oracledb");

async function get_all_orders(req, res, next) {
    try {
        let query = `
                        SELECT * 
                        FROM ORDER_ITEM 
                        WHERE ${req.user.id} = (
                            SELECT USER_ID
                            FROM ORDERS
                            WHERE ID = ORDER_ID
                        )
                    `;

        let result = await databaseQuery(query);

        return res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: err.message });
    }
}

async function order_details_get(req, res, next) {
    return res.status(200).json({ message: "NOT IMPLEMENTED: order_details_get" });
}

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

        for (let item of req.body.list) {
            const product_id = 0;
            const quantity = 0;

            query = `INSERT INTO ORDER_ITEM (ORDER_ID, PRODUCT_ID, QUANTITY, STATUS) VALUES (:orderId, :productId, :quantity, 'PENDING')`;
            binds = {
                orderId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: order_id },
                productId: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: item.productId },
                quantity: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: item.quantity },
            };
            result = await databaseQuery(query, binds);
        }

        return res.status(200).json({ message: "Order added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: err.message });
    }
}

async function cancel_order_post(req, res, next) {
    return res.status(200).json({ message: "NOT IMPLEMENTED: cancel_order_post" });
}

module.exports = {
    get_all_orders,
    add_order_post,
    cancel_order_post,
    order_details_get,
};
