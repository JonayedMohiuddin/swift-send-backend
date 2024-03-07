let { databaseQuery } = require("../backend/databaseQuery");

// Display list of all Categories.
async function categories(req, res, next) {
    try {
        const categories = await databaseQuery("SELECT * FROM CATEGORY");
        res.status(200).send(categories.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching categories");
    }
}

module.exports = {
    categories,
};
