let { databaseQuery } = require("../backend/databaseQuery");
let oracledb = require("oracledb");

// URL : '/admin'
async function index(req, res, next) {
    return res.json({ message: "Admin index not IMPLEMENTED YET." });
}

// URL : '/admin/addCategory'
async function add_category_post(req, res, next) {
    let { name, description, imageUrl } = req.body;

    try {
        if (!name) return res.status(400).send({ errorMessage: "Category name is required" });
        if (!description) return res.status(400).send({ errorMessage: "Category description is required" });
        // if (!imageUrl) return res.status(400).send({ errorMessage: "Category image url is required" });
        if(!imageUrl) imageUrl = "/images/no-product-image.jpg"

        let query = `SELECT * FROM CATEGORY WHERE NAME = '${name}'`;
        let result = await databaseQuery(query);
        if (result.rows.length > 0) return res.status(400).send({ errorMessage: "Category already exists" });
        
        query = `INSERT INTO CATEGORY (NAME, DESCRIPTION, IMAGE_URL) VALUES ('${name}', '${description}', '${imageUrl}')`;
        result = await databaseQuery(query);
        if (result.rowsAffected === 0) throw new Error("Error adding category");
        return res.json({ message: "Category added successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ errorMessage: "Error adding category" });
    }
}

// URL : '/admin/removeCategory'
async function remove_category_post(req, res, next) {
    let { categoryId } = req.body;

    try {
        if (!categoryId) return res.status(400).send({ errorMessage: "Category ID is required" });

        let query = `SELECT * FROM CATEGORY WHERE ID = ${categoryId}`;
        let result = await databaseQuery(query);
        if (result.rows.length === 0) return res.status(400).send({ errorMessage: "Category does not exist" });

        query = `DELETE FROM CATEGORY WHERE ID = ${categoryId}`;
        result = await databaseQuery(query);
        if (result.rowsAffected === 0) throw new Error("Error removing category");
        return res.json({ message: "Category removed successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ errorMessage: "Error removing category" });
    }
}

// URL : '/admin/orders/:status' 
async function get_orders(req, res, next) {
    let status = req.params.status;

    try {
        if(!status) return res.status(400).send("Status is required");
        if(status !== "PENDING" && status !== "DELIVERED") return res.status(400).send("Invalid status");
        
        let query = ` 
                        SELECT 
                        SSWI.ID AS SSWI_ID,
                        SSWI.ADDRESS AS ADDRESS,
                        SSWI.CREATED_AT AS CREATED_AT,
                        ( 
                            SELECT NAME 
                            FROM USERS 
                            WHERE ID = SSWI.USER_ID    
                        ) AS USER_NAME,

                        OI.ORDER_ID AS ORDER_ID,
                        OI.PRODUCT_ID AS PRODUCT_ID, 
                        OI.QUANTITY AS QUANTITY,
                        OI.LAST_UPDATED_ON AS LAST_UPDATED_ON,
                        
                        PR.NAME AS NAME,
                        PR.CATEGORY_ID AS CATEGORY_ID,
                        PR.PRICE AS PRICE,
                        PR.IMAGE_URL AS IMAGE_URL,
                        PR.DISCOUNT AS DISCOUNT

                        FROM SWIFT_SEND_WAREHOUSE_ITEM SSWI
                        JOIN ORDER_ITEM OI ON SSWI.ORDER_ITEM_ID = OI.ID
                        JOIN PRODUCT PR ON OI.PRODUCT_ID = PR.ID
                        WHERE SSWI.STATUS = '${status}'
                        `;
        let result = await databaseQuery(query);
        return res.json(result.rows);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error fetching orders");
    }
}

// URL : '/admin/delivered/:id'
async function deliver_order_post(req, res, next) {
    const id = req.params.id;

    try {
        if (!id) return res.status(400).send("Order ID is required");
    
        let query = `UPDATE SWIFT_SEND_WAREHOUSE_ITEM SET STATUS = 'DELIVERED' WHERE ID = ${id}`;
        await databaseQuery(query);
        return res.json({ message: "Order delivered successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error delivering order");
    }
}

// URL : '/admin/suppliers'
async function get_suppliers(req, res, next) {
    try {
        let query = `SELECT * FROM SUPPLIER`;
        let result = await databaseQuery(query);
        return res.json(result.rows);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error fetching suppliers");
    }
} 
  
// URL : '/admin/removeSupplier/:id' 
async function remove_supplier(req, res, next) {
    try {
        let query = `DELETE FROM SUPPLIER WHERE ID = ${req.params.id}`;
        let result = await databaseQuery(query);
        return res.json(result.rows);
    } catch (err) { 
        console.error(err);
        return res.status(500).send("Error fetching suppliers");
    }
}
 
module.exports = {
    index,
    add_category_post,
    remove_category_post,
    get_orders,
    deliver_order_post,
    get_suppliers,
    remove_supplier
}; 
