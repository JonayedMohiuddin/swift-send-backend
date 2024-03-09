let { databaseQuery } = require("../backend/databaseQuery");
const oracledb = require("oracledb");

async function supplier_all_get(req, res, next) {
    try {
        const query = "SELECT * FROM SUPPLIER";
        const result = await databaseQuery(query);
        console.log("result: ", result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error("Error in supplier_all_get: ", error);
        res.status(500).json({ errorMessage: "Internal Server Error" });
    }
}

async function supplier_details_get(req, res, next) {
    try {
        const query = "SELECT * FROM SUPPLIER WHERE SUPPLIER_ID = $1";
        const values = [req.params.id];
        const result = await databaseQuery(query, values);
        console.log("result: ", result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error("Error in supplier_details_get: ", error);
        res.status(500).json({ errorMessage: "Internal Server Error" });
    }
}

async function supplier_products_get(req, res, next) {
    try {
        const query = `
                SELECT 
                
                PR.ID AS PRODUCT_ID,
                PR.NAME AS PRODUCT_NAME,
                PR.PRICE AS PRODUCT_PRICE,
                PR.DESCRIPTION AS PRODUCT_DESCRIPTION,
                PR.IMAGE_URL AS PRODUCT_IMAGE_URL,
                PR.DISCOUNT AS PRODUCT_DISCOUNT,
                PR.IS_DELETED AS IS_DELETED,
                (
                    SELECT NVL(AVG(RR.RATING), 0)
                    FROM RATING_REVIEW RR
                    WHERE RR.PRODUCT_ID = PR.ID 
                ) AS RATING,
                (
                    SELECT NVL(COUNT(RR.RATING), 0)
                    FROM RATING_REVIEW RR
                    WHERE RR.PRODUCT_ID = PR.ID
                ) AS RATING_COUNT,
                (
                    SELECT NVL(COUNT(ORD.ID) * SUM(ORD.QUANTITY), 0)
                    FROM ORDER_ITEM ORD
                    WHERE ORD.PRODUCT_ID = PR.ID
                ) AS TOTAL_SOLD,
 
                CA.ID AS CATEGORY_ID,
                CA.NAME AS CATEGORY_NAME,
                CA.DESCRIPTION AS CATEGORY_DESCRIPTION,
                CA.IMAGE_URL AS CATEGORY_IMAGE_URL

                FROM PRODUCT PR 
                LEFT JOIN CATEGORY CA 
                ON PR.CATEGORY_ID = CA.ID
                WHERE SUPPLIER_ID = ${req.user.id}`;

        const result = await databaseQuery(query);
        console.log("result: ", result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error("Error in supplier_products_get: ", error);
        res.status(500).json({ errorMessage: "Internal Server Error" });
    }
}

async function add_product_post(req, res, next) {
    const { categoryId, name, price, description, imageUrl, discount } = req.body;
    const supplier = req.user;

    try {
        // check if the product exists already
        let query = `SELECT * FROM PRODUCT WHERE NAME = '${name}' AND SUPPLIER_ID = ${supplier.id}`;
        let result = await databaseQuery(query);
        if (result.rows.length > 0) {
            return res.status(400).json({ errorMessage: "Product already exists" });
        }

        // check if category exists
        query = `SELECT * FROM CATEGORY WHERE ID = ${categoryId}`;
        result = await databaseQuery(query);
        if (result.rows.length === 0) {
            return res.status(400).json({ errorMessage: "Category does not exist" });
        }

        query = `INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE, DESCRIPTION, IMAGE_URL, DISCOUNT, RATING_COUNT, TOTAL_RATING) VALUES (${supplier.id}, ${categoryId}, '${name}', ${price}, '${description}', '${imageUrl}', ${discount}, 0, 0)`;
        result = await databaseQuery(query);
        res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        console.error("Error in add_product_post: ", error);
        res.status(500).json({ errorMessage: "Internal Server Error" });
    }
}

async function restore_product_post(req, res, next) {
    const { productId } = req.body;
    const supplier = req.user;

    try {
        let query = `SELECT * FROM PRODUCT WHERE ID = ${productId}`;
        let result = await databaseQuery(query);
        if (result.rows.length === 0) {
            return res.status(400).json({ errorMessage: "Product does not exist" });
        } else if (result.rows[0].SUPPLIER_ID !== req.user.id) {
            return res.status(400).json({ errorMessage: "You are not authorized to restore this product" });
        }

        query = `UPDATE PRODUCT SET IS_DELETED = 0 WHERE ID = ${productId}`;
        result = await databaseQuery(query);
        res.status(200).json({ message: "Product restored successfully" });
    } catch (error) {
        console.error("Error in restore_product_post: ", error);
        res.status(500).json({ errorMessage: "Internal Server Error" });
    }
}

async function remove_product_post(req, res, next) {
    const { productId } = req.body;
    const supplier = req.user;

    try {
        let query = `SELECT * FROM PRODUCT WHERE ID = ${productId}`;
        let result = await databaseQuery(query);
        if (result.rows.length === 0) {
            return res.status(400).json({ errorMessage: "Product does not exist" });
        } else if (result.rows[0].SUPPLIER_ID !== req.user.id) {
            return res.status(400).json({ errorMessage: "You are not authorized to remove this product" });
        } else if (result.rows[0].IS_DELETED === 1) {
            return res.status(400).json({ errorMessage: "Product already removed" });
        }

        query = `UPDATE PRODUCT SET IS_DELETED = 1 WHERE ID = ${productId}`;
        result = await databaseQuery(query);
        res.status(200).json({ message: "Product removed successfully" });
    } catch (error) {
        console.error("Error in remove_product_post: ", error);
        res.status(500).json({ errorMessage: "Internal Server Error" });
    }
}

/*
  "productId": "1",
  "categoryId": "1",
  "name": "Product 1",
  "price": 100,
  "description": "",
  "imageUrl": ""
  */
async function update_product_post(req, res, next) {
    const { productId, categoryId, name, price, description, imageUrl, discount } = req.body;

    try {
        // check if the product exists already
        let query = `SELECT * FROM PRODUCT WHERE ID = ${productId}`;
        let result = await databaseQuery(query);
        if (result.rows.length === 0) {
            return res.status(400).json({ errorMessage: "Product does not exist" });
        } else if (result.rows[0].SUPPLIER_ID !== req.user.id) {
            return res.status(400).json({ errorMessage: "You are not authorized to update this product" });
        }

        // check if category exists
        query = `SELECT * FROM CATEGORY WHERE ID = ${categoryId}`;
        result = await databaseQuery(query);
        if (result.rows.length === 0) {
            return res.status(400).json({ errorMessage: "Category does not exist" });
        }

        if (price < 0 || discount < 0 || discount >= 1) {
            return res.status(400).json({ errorMessage: "Price or discount cannot be negative" });
        }

        query = `UPDATE PRODUCT SET CATEGORY_ID = ${categoryId}, NAME = '${name}', PRICE = ${price}, DESCRIPTION = '${description}', IMAGE_URL = '${imageUrl}', DISCOUNT = ${discount} WHERE ID = ${productId}`;
        result = await databaseQuery(query);
        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        console.error("Error in update_product_post: ", error);
        res.status(500).json({ errorMessage: "Internal Server Error" });
    }
}

// **************************
// THIS IS A SCOPE FOR USING SUB QUERY IF I HADNT PUT THE SUPPLIER_ID IN THE SUPPLIER_PENDING_ORDERS TABLE
// **************************
// FUTURE CONSIDERATION NEEDS TO BE MADE TO USE SUB QUERY
// **************************

// URL = '/supplier/orders/:status'
async function get_all_orders_status(req, res, next) {
    let status = req.params.status;
    try {
        let supplierId = req.user.id;
        let query = `
                        SELECT 
                        SO.ID AS SUPPLIER_ORDER_ID,  
                        SO.ORDER_ITEM_ID AS ORDER_ITEM_ID,
                        SO.SUPPLIER_ID AS SUPPLIER_ID,
                        SO.STATUS AS STATUS,
                        SO.ADDRESS AS ADDRESS,
                        SO.STATUS AS STATUS,
                        SO.CREATED_AT AS CREATED_AT,
                        (
                            SELECT NAME
                            FROM USERS
                            WHERE ID = SO.USER_ID
                        ) AS USER_NAME,

                        OI.ORDER_ID AS ORDER_ID,
                        OI.PRODUCT_ID AS PRODUCT_ID, 
                        OI.QUANTITY AS QUANTITY,
                        OI.LAST_UPDATED_ON AS LAST_UPDATED_ON,
 
                        PR.NAME AS NAME,
                        PR.CATEGORY_ID AS CATEGORY_ID,
                        PR.PRICE AS PRICE,
                        PR.IMAGE_URL AS IMAGE_URL,
                        PR.DISCOUNT AS DISCOUNT,
                        (
                            SELECT NVL(AVG(RR.RATING), 0)
                            FROM RATING_REVIEW RR
                            WHERE RR.PRODUCT_ID = PR.ID 
                        ) AS RATING,
                        (
                            SELECT NVL(COUNT(RR.RATING), 0)
                            FROM RATING_REVIEW RR
                            WHERE RR.PRODUCT_ID = PR.ID
                        ) AS RATING_COUNT,
                        (
                            SELECT NVL(COUNT(ORD.ID) * SUM(ORD.QUANTITY), 0)
                            FROM ORDER_ITEM ORD
                            WHERE ORD.PRODUCT_ID = PR.ID
                        ) AS TOTAL_SOLD 

                        FROM SUPPLIER_ORDERS SO 
                        JOIN ORDER_ITEM OI
                        ON SO.ORDER_ITEM_ID = OI.ID
                        JOIN PRODUCT PR
                        ON OI.PRODUCT_ID = PR.ID
                        WHERE ${supplierId} = SO.SUPPLIER_ID
                        AND SO.STATUS = UPPER('${status}')  
                    `;

        if (status === "shipped") {
            query += `ORDER BY OI.LAST_UPDATED_ON ASC, OI.ID ASC`;
        } else {
            query += `ORDER BY OI.LAST_UPDATED_ON DESC, OI.ID ASC`;
        }

        // query = `   SELECT *
        //             FROM SUPPLIER_ORDERS SO
        //             JOIN ORDER_ITEM OI
        //             ON SO.ORDER_ITEM_ID = OI.ID
        //             JOIN PRODUCT PR
        //             ON OI.PRODUCT_ID = PR.ID
        //             WHERE ${supplierId} = SO.SUPPLIER_ID
        //             ORDER BY OI.LAST_UPDATED_ON DESC, OI.ID ASC`;

        let result = await databaseQuery(query);

        return res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: err.message });
    }
}

// URL = '/supplier/orders'
async function get_all_orders(req, res, next) {
    let status = req.params.status;
    try {
        let supplierId = req.user.id;
        let query = `
                        SELECT 
                        SO.ID AS SUPPLIER_ORDER_ID,  
                        SO.ORDER_ITEM_ID AS ORDER_ITEM_ID,
                        SO.SUPPLIER_ID AS SUPPLIER_ID,
                        SO.STATUS AS STATUS,
                        SO.ADDRESS AS ADDRESS,
                        SO.STATUS AS STATUS,
                        SO.CREATED_AT AS CREATED_AT,

                        OI.ORDER_ID AS ORDER_ID,
                        OI.PRODUCT_ID AS PRODUCT_ID, 
                        OI.QUANTITY AS QUANTITY,
                        OI.LAST_UPDATED_ON AS LAST_UPDATED_ON,
 
                        PR.NAME AS NAME,
                        PR.CATEGORY_ID AS CATEGORY_ID,
                        PR.PRICE AS PRICE,
                        PR.IMAGE_URL AS IMAGE_URL,
                        PR.DISCOUNT AS DISCOUNT,

                        (
                            SELECT NAME
                            FROM USERS
                            JOIN ORDERS
                            ON USERS.ID = ORDERS.USER_ID
                            WHERE ORDERS.ID = OI.ORDER_ID
                        ) AS USER_NAME

                        FROM SUPPLIER_ORDERS SO 
                        JOIN ORDER_ITEM OI
                        ON SO.ORDER_ITEM_ID = OI.ID
                        JOIN PRODUCT PR
                        ON OI.PRODUCT_ID = PR.ID
                        WHERE ${supplierId} = SO.SUPPLIER_ID
                        ORDER BY OI.LAST_UPDATED_ON DESC, OI.ID ASC
                    `;

        // query = `   SELECT *
        //             FROM SUPPLIER_ORDERS SO
        //             JOIN ORDER_ITEM OI
        //             ON SO.ORDER_ITEM_ID = OI.ID
        //             JOIN PRODUCT PR
        //             ON OI.PRODUCT_ID = PR.ID
        //             WHERE ${supplierId} = SO.SUPPLIER_ID
        //             ORDER BY OI.LAST_UPDATED_ON DESC, OI.ID ASC`;

        let result = await databaseQuery(query);

        return res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: err.message });
    }
}

async function ship_product_post(req, res, next) {
    try {
        let supplierId = req.user.id;
        let supplierOrderId = req.params.supplierOrderId;

        let query = `SELECT * FROM SUPPLIER_ORDERS WHERE ID = ${supplierOrderId} AND SUPPLIER_ID = ${supplierId}`;
        let result = await databaseQuery(query);
        if (result.rows.length === 0) {
            return res.status(400).json({ errorMessage: "Order item does not exist" });
        }

        // query = `DELETE FROM SUPPLIER_PENDING_ORDERS WHERE SUPPLIER_ID = ${supplierId} AND ORDER_ITEM_ID = ${orderItemId}`;
        query = `UPDATE SUPPLIER_ORDERS SET STATUS = 'SHIPPED' WHERE ID = ${supplierOrderId} AND SUPPLIER_ID = ${supplierId}`;
        result = await databaseQuery(query);

        return res.status(200).json({ message: "Product shipped successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: err.message });
    }
}

async function supplier_about_get(req, res, next) {
    try {
        const query = `SELECT * FROM SUPPLIER WHERE ID = ${req.user.id}`;
        const result = await databaseQuery(query);
        console.log("result: ", result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error("Error in supplier_profile_get: ", error);
        res.status(500).json({ errorMessage: "Internal Server Error" });
    }
}

async function update_about_post(req, res, next) {
    const { name, email, address, imageUrl, description } = req.body;
    const supplier = req.user;

    try {
        let query = `UPDATE SUPPLIER SET NAME = '${name}', EMAIL = '${email}', ADDRESS = '${address}', IMAGE_URL = '${imageUrl}', DESCRIPTION = '${description}' WHERE ID = ${supplier.id}`;
        let result = await databaseQuery(query);
        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error in update_about_post: ", error);
        res.status(500).json({ errorMessage: "Internal Server Error" });
    }
}

/*
CREATE OR REPLACE PROCEDURE REMOVE_SUPPLIER(SUPPLIER_ID_PARAM IN NUMBER, MESSAGE OUT VARCHAR2, STATUS OUT NUMBER) IS
	SUPPLIER_ID_VAR NUMBER;
BEGIN
    STATUS := -1;
    SELECT ID INTO SUPPLIER_ID_VAR FROM SUPPLIER WHERE ID = SUPPLIER_ID_PARAM;

    FOR ITEM IN (SELECT * FROM PRODUCT WHERE SUPPLIER_ID = SUPPLIER_ID_VAR) LOOP
        UPDATE PRODUCT SET IS_DELETED = 1 WHERE ID = ITEM.ID;
    END LOOP;
    MESSAGE := 'PRODUCTS DELETED SUCCESSFULLY!!';

    DELETE FROM SUPPLIER WHERE ID = SUPPLIER_ID_VAR;
    MESSAGE := 'SUPPLIER REMOVED SUCCESSFULLY!!';
    STATUS := 0;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        MESSAGE := 'NO SUPPLIER WITH GIVEN ID EXISTS!!';
        STATUS := -1;
        RETURN;
END;
/
*/

async function remove_supplier_post(req, res, next) {
    const supplierId = req.user.id;

    try {
        let query = `BEGIN REMOVE_SUPPLIER(${supplierId}, :message, :status); END;`;
        let binds = {
            message: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
            status: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        };
        let result = await databaseQuery(query, binds);

        res.clearCookie("token");

        if (result.outBinds.status === 0) {
            return res.status(200).json({ message: result.outBinds.message });
        } else {
            return res.status(400).json({ errorMessage: result.outBinds.message });
        }
    } catch (error) {
        console.error("Error in remove_supplier_post: ", error);
        res.status(500).json({ errorMessage: "Internal Server Error" });
    }
}

module.exports = {
    add_product_post,
    remove_product_post,
    restore_product_post,
    update_product_post,
    supplier_details_get,
    supplier_all_get,
    supplier_products_get,
    get_all_orders,
    get_all_orders_status,
    ship_product_post,
    supplier_about_get,
    update_about_post,
    remove_supplier_post,
};
