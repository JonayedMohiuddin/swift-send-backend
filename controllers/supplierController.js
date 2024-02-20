let { databaseQuery } = require("../backend/databaseQuery");

async function supplier_details_get(req, res, next) {
    console.log("supplier_details_get called");
    const supplier_id = req.params.id;
    console.log("supplier_id: ", supplier_id);
}

async function add_product_post(req, res, next) {
    console.log("add_product_post called");
}

async function remove_product_post(req, res, next) {
    console.log("remove_product_post called");
}

async function update_product_post(req, res, next) {
    console.log("update_product_post called");
}

module.exports = {
    add_product_post,
    remove_product_post,
    update_product_post,
    supplier_details_get,
};
