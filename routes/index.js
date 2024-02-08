const express = require("express");
const router = express.Router(/* { mergeParams: true } */);

/* GET home page. */
router.get("/", function (req, res, next) {
    res.redirect("/catalog");
});

module.exports = router;
