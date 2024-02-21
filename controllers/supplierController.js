let { databaseQuery } = require("../backend/databaseQuery");

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
        const query = `SELECT * FROM PRODUCT WHERE SUPPLIER_ID = ${req.user.id}`;

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

        query = `INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE, DESCRIPTION, IMAGE_URL, DISCOUNT) VALUES (${supplier.id}, ${categoryId}, '${name}', ${price}, '${description}', '${imageUrl}', ${discount})`;
        result = await databaseQuery(query);
        res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        console.error("Error in add_product_post: ", error);
        res.status(500).json({ errorMessage: "Internal Server Error" });
    }
}

async function remove_product_post(req, res, next) {
    const { productId } = req.body;
    const supplier = req.user;

    try {
        let query = `SELECT * FROM PRODUCT WHERE ID = ${productId} AND SUPPLIER_ID = ${supplier.id}`;
        let result = await databaseQuery(query);
        if (result.rows.length === 0) {
            return res.status(400).json({ errorMessage: "Product does not exist" });
        }

        query = `DELETE FROM PRODUCT WHERE ID = ${productId} AND SUPPLIER_ID = ${supplier.id}`;
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

module.exports = {
    add_product_post,
    remove_product_post,
    update_product_post,
    supplier_details_get,
    supplier_all_get,
    supplier_products_get,
};
