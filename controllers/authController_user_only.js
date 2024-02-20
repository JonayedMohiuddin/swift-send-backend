require("dotenv").config();

let { databaseQuery } = require("../backend/databaseQuery");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const tokenExpiryDuration = 86400; // in seconds, 24 hours

async function signup(req, res) {
    try {
        console.log(req.body);

        const users = await databaseQuery(`SELECT * FROM USERS WHERE EMAIL = '${req.body.email}'`);
        console.log(users.rows);

        if (users.rows.length > 0) {
            console.log("User already exists");
            return res.status(400).json({ errorMessage: "User already signed up." });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword);

        const query = `INSERT INTO USERS (FIRSTNAME, LASTNAME, EMAIL, PASSWORD) VALUES ('${req.body.firstname}', '${req.body.lastname}', '${req.body.email}', '${hashedPassword}')`;
        await databaseQuery(query);

        res.status(201).send();
    } catch (err) {
        res.status(500).json({ errorMessage: "Error in signup. Please try again." });
    }
}

async function login(req, res) {
    const query = `SELECT * FROM USERS WHERE EMAIL = '${req.body.email}'`;
    let users = await databaseQuery(query);

    if(!users) return res.status(500).json({ errorMessage: "Error in login. Please try again." });

    if (users.rows.length === 0) {
        console.log("Email address doesn't exist.");
        return res.status(400).json({ errorMessage: "Email address doesn't exist." });
    } else if (users.rows.length > 1) {
        console.log("MAJOR ERROR: Multiple users with same email address.");
        return res.status(500).json({ errorMessage: "MAJOR ERROR: Multiple users with same email address." });
    }

    const user = users.rows[0];

    try {
        if (await bcrypt.compare(req.body.password, user.PASSWORD)) {
            const accessToken = generateAccessToken({ id: user.ID, firstname: user.FIRSTNAME, lastname: user.LASTNAME, email: user.EMAIL});
            res.cookie("token", accessToken, { sameSite: 'Lax' });
            return res.status(200).json({ accessToken: accessToken, message: "Success" });
        } else {
            return res.status(401).json({ errorMessage: "Invalid password." });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ errorMessage: "Error in login. Please try again." });
    }
}

function generateAccessToken(user) {
    // console.log("Generating access token for user: ", user);
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: tokenExpiryDuration });
}

async function logout(req, res) {
    res.clearCookie("token");
    res.status(204).send();
}

// let refreshTokens = [];
// async function refreshToken(req, res) {
//     const refreshToken = req.body.token;
//     if (refreshToken == null) return res.sendStatus(401);
//     if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         const accessToken = generateAccessToken({ firstname: user.firstname, lastname: user.lastname, email: user.EMAIL});
//         res.json({ accessToken: accessToken });
//     });
// }

// async function logout(req, res) {
//     refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
//     res.sendStatus(204);
// }

async function get_users(req, res) {
    const users = await databaseQuery("SELECT * FROM USERS");
    console.log(users.rows);

    res.status(200).json(users.rows);
}

module.exports = {
    login,
    logout,
    get_users,
    signup,
};
