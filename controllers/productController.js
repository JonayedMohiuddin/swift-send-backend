let { databaseQuery } = require("../backend/databaseQuery");

// Display list of all Products.
// URL = '/catalog/products/:category?search=<>'
async function products(req, res, next) {
    const category = req.params.category; // parameter
    const search = req.query.search; // query string

    const page = req.query.page - 1 || 0;
    const product_per_page = 30;

    console.log("category:", category);
    console.log("search:", search);

    try {
        let categorySearchCondition = "";
        let nameSearchCondition = "";

        if (category && category != "all") categorySearchCondition = ` AND C.NAME = '${category}' `;
        if (search) nameSearchCondition = ` AND UPPER(P.NAME) LIKE UPPER('%${search}%') `;

        let query = ` SELECT * 
                      FROM PRODUCT P 
                      LEFT JOIN CATEGORY C 
                      ON P.CATEGORY_ID = C.ID 
                      
                      WHERE 1 = 1 
                      ${categorySearchCondition}
                      ${nameSearchCondition}
                      
                      ORDER BY P.ID OFFSET ${page * product_per_page} ROWS FETCH NEXT ${product_per_page} ROWS ONLY`;

        console.log("query:", query);

        const result = await databaseQuery(query);

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
}

// Display detail page for a specific Product.
// URL = '/catalog/product/:id'

async function product_detail(req, res, next) {
    try {
        let query = `
                SELECT 
                C.NAME AS CATEGORY_NAME,
                S.NAME AS SUPPLIER_NAME,
                PR.*

                FROM PRODUCT PR 
                LEFT JOIN CATEGORY C ON PR.CATEGORY_ID = C.ID
                LEFT JOIN SUPPLIER S ON PR.SUPPLIER_ID = S.ID 
                WHERE PR.ID = ${req.params.id}`;

        const result = await databaseQuery(query);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

async function products_count(req, res, next) {
    const category = req.params.category; // parameter
    const search = req.query.search; // query string

    console.log("category:", category);
    console.log("search:", search);

    try {
        let categorySearchCondition = "";
        let nameSearchCondition = "";

        if (category && category != "all") categorySearchCondition = ` AND C.NAME = '${category}' `;
        if (search) nameSearchCondition = ` AND UPPER(P.NAME) LIKE UPPER('%${search}%') `;

        let query = ` SELECT COUNT(*) AS COUNT
                      FROM PRODUCT P 
                      LEFT JOIN CATEGORY C 
                      ON P.CATEGORY_ID = C.ID 
                      
                      WHERE 1 = 1 
                      ${categorySearchCondition}
                      ${nameSearchCondition}`;

        console.log("query:", query);

        const result = await databaseQuery(query);

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function products_pages(req, res, next) {
    const category = req.params.category; // parameter
    const search = req.query.search; // query string

    const product_per_page = 30;

    console.log("category:", category);
    console.log("search:", search);

    try {
        let categorySearchCondition = "";
        let nameSearchCondition = "";

        if (category && category != "all") categorySearchCondition = ` AND C.NAME = '${category}' `;
        if (search) nameSearchCondition = ` AND UPPER(P.NAME) LIKE UPPER('%${search}%') `;

        let query = ` SELECT COUNT(*) AS COUNT
                      FROM PRODUCT P 
                      LEFT JOIN CATEGORY C 
                      ON P.CATEGORY_ID = C.ID 
                      
                      WHERE 1 = 1 
                      ${categorySearchCondition}
                      ${nameSearchCondition}`;

        console.log("query:", query);

        const result = await databaseQuery(query);

        let productCount = result.rows[0].COUNT;
        let pageCount = Math.ceil(productCount / product_per_page);

        res.status(200).json({ COUNT: pageCount, PRODUCT_COUNT: productCount });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function get_reviews(req, res, next) {
    try {
        let query = `
                        SELECT * 
                        FROM RATING_REVIEW RR 
                        JOIN USERS U
                        ON RR.USER_ID = U.ID
                        WHERE PRODUCT_ID = ${req.params.id}
                    `;
        const result = await databaseQuery(query);

        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { products, product_detail, products_count, products_pages, get_reviews };
