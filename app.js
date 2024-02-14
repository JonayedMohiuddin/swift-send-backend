/*
 * MODULE DEPENDENCIES
 */

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const oracledb = require("oracledb");
const createError = require("http-errors");
const cors = require("cors");

oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const catalogRouter = require("./routes/catalog");
const cartRouter = require("./routes/cart");

const app = express();

// set cors
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

/*
 * SERVE STATIC FILES AND USE MIDDLEWARES
 */

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);
app.use("/cart", cartRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
