require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const tokenExpiryDuration = 86400; // in seconds, 24 hours

const users = [];

const posts = [
    {
        username: "Kyle",
        title: "Post 1",
    },
    {
        username: "Jim",
        title: "Post 2",
    },
];

let refreshTokens = [];

async function refreshToken(req, res) {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken: accessToken });
    });
}

async function login(req, res) {
    const user = users.find((user) => user.name === req.body.username);
    if (user == null) {
        return res.status(400).send("Cannot find user");
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = generateAccessToken({ username: user.name });
            res.status(200).json({ accessToken: accessToken, message: "Success" });
        } else {
            res.status(401).send("Not Allowed");
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send("Error in login. Please try again.");
    }
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: tokenExpiryDuration });
}

async function logout(req, res) {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.sendStatus(204);
}

async function get_users(req, res) {
    res.status(200).json(users);
}

async function signup(req, res) {
    try {
        if (users.find((user) => user.name === req.body.username)) return res.status(400).send("User already exists");

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword);
        const user = { name: req.body.username, password: hashedPassword };
        users.push(user);
        res.status(201).send();
    } catch (err) {
        res.status(500).send();
    }
}

module.exports = {
    refreshToken,
    login,
    logout,
    get_users,
    signup,
};
