const jwt = require("jsonwebtoken");

// MIDDLEWARE FOR USER AUTHENTICATION
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    // AUTHENTICATION HEADER : 'BEARER TOKEN'
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) res.sendStatus(401).send("No login token found. Please login to access this page.");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) res.sendStatus(403);
        req.user = user;
        console.log("User : ", user);
        next();
    });
}

module.exports = authenticateToken;
