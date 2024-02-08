let { databaseQuery } = require("../backend/databaseQuery");

// Index page
async function index(req, res, next) {
    res.send("NOT IMPLEMENTED: Site Home Page");
}

// Display list of all Products.
async function products(req, res, next) {
    try {
        const result = await databaseQuery("SELECT * FROM PRODUCT");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

// Display detail page for a specific Product.
async function product_detail(req, res, next) {
    try {
        const result = await databaseQuery(`SELECT * FROM PRODUCT WHERE ID = ${req.params.id}`);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

// Display Product create form on GET.
async function product_create_get(req, res, next) {
    res.send("NOT IMPLEMENTED: Product create GET");
}

// Handle Product create on POST.
async function product_create_post(req, res, next) {
    res.send("NOT IMPLEMENTED: Product create POST");
}

// Display Product delete form on GET.
async function product_delete_get(req, res, next) {
    res.send("NOT IMPLEMENTED: Product delete GET");
}

// Handle Product delete on POST.
async function product_delete_post(req, res, next) {
    res.send("NOT IMPLEMENTED: Product delete POST");
}

// Display Product update form on GET.
async function product_update_get(req, res, next) {
    res.send("NOT IMPLEMENTED: Product update GET");
}

// Handle Product update on POST.
async function product_update_post(req, res, next) {
    res.send("NOT IMPLEMENTED: Product update POST");
}

module.exports = {
    index,
    products,
    product_detail,
    product_create_get,
    product_create_post,
    product_delete_get,
    product_delete_post,
    product_update_get,
    product_update_post,
};
