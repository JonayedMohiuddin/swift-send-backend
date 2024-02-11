let { databaseQuery } = require("../backend/databaseQuery");

// Index page
async function index(req, res, next) {
    res.redirect("/catalog");
}

// Display list of all Categorys.
async function categories(req, res, next) {
    try {
        const categories = await databaseQuery("SELECT * FROM CATEGORY");
        res.status(200).send(categories.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching categories");
    }
}

// Display detail page for a specific Category.
async function category_detail(req, res, next) {
    const cateogry = req.params.id;
    const categories = await databaseQuery("SELECT * FROM CATEGORY");
    const productList = await databaseQuery("SELECT * FROM PRODUCT P JOIN CATEGORY C ON P.CATEGORY_ID = C.ID WHERE C.NAME = :categoryName", { categoryName: cateogry });
    res.render("index", { title: "Swift-Send", categories: categories.rows, currentCategory: cateogry, products: productList.rows });
}

// Display Category create form on GET.
async function category_create_get(req, res, next) {
    res.send("NOT IMPLEMENTED: Category create GET");
}

// Handle Category create on POST.
async function category_create_post(req, res, next) {
    res.send("NOT IMPLEMENTED: Category create POST");
}

// Display Category delete form on GET.
async function category_delete_get(req, res, next) {
    res.send("NOT IMPLEMENTED: Category delete GET");
}

// Handle Category delete on POST.
async function category_delete_post(req, res, next) {
    res.send("NOT IMPLEMENTED: Category delete POST");
}

// Display Category update form on GET.
async function category_update_get(req, res, next) {
    res.send("NOT IMPLEMENTED: Category update GET");
}

// Handle Category update on POST.
async function category_update_post(req, res, next) {
    res.send("NOT IMPLEMENTED: Category update POST");
}

module.exports = {
    index,
    categories,
    category_detail,
    category_create_get,
    category_create_post,
    category_delete_get,
    category_delete_post,
    category_update_get,
    category_update_post,
};
