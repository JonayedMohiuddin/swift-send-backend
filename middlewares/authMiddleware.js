const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// MIDDLEWARE FOR USER AUTHENTICATION
function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    console.log("Token : ", token);

    // AUTHENTICATION HEADER : 'BEARER <TOKEN>'
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(401).json({ errorMessage: "No login token found. Please login to access this page." });

    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        console.log("User : ", user);
        next();
    } catch (err) {
        console.log(err);
        res.clearCookie("token");
        return res.status(403).json({ errorMessage: "Invalid token or token expired. Login again to access this page." });
    }
}

module.exports = authenticateToken;
