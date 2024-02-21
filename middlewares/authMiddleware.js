const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// MIDDLEWARE FOR USER AUTHENTICATION
function authenticateToken(userType) {
    return function (req, res, next) {
        const token = req.cookies.token;
        console.log("Token: ", token);

        if (token == null || token == undefined) {
            return res.status(401).json({ errorMessage: "Please login to access this page." });
        }

        try {
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (user.userType !== userType) {
                return res.status(403).json({ errorMessage: `Login with ${userType} account to access this page.` });
            }
            req.user = user;
            console.log("Cookie Data: ", user);
            next();
        } catch (err) {
            console.log(err);
            res.clearCookie("token");
            return res.status(403).json({ errorMessage: "Invalid token or token expired. Login again to access this page." });
        }
    };
}

module.exports = authenticateToken;
