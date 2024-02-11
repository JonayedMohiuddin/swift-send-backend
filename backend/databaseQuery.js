/*
 * SETTING UP ORACLE DATABASE CONNECTION AND QUERYING
 */

const oracledb = require("oracledb");
require("dotenv").config(); // Load environment variables from .env file

const ORACLE_DATABASE_CREDENTIALS = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING,
};

let connection = undefined;

async function establishDatabaseConnection() {
    try {
        if (connection === undefined) {
            connection = await oracledb.getConnection(ORACLE_DATABASE_CREDENTIALS);
            console.log("Connection established with Oracle DB.");
        }
    } catch (error) {
        console.error("Error establishing connection with Oracle DB: ", error);
    }
}

async function databaseQuery(query, params = [], options = {}) {
    try {
        await establishDatabaseConnection();

        let result = await connection.execute(query, params, options);

        // if (result.rows) {
        //     console.log("Query Result:", result.rows);
        // } else if (result.rowsAffected) {
        //     console.log("Rows Affected:", result.rowsAffected);
        // }

        return result;
    } catch (error) {
        console.error("Couldn't execute DB query:", error);
        return null;
    } finally {
        if (connection) {
            try {
                await connection.close();
                connection = undefined;
            } catch (error) {
                console.error("Error closing connection with Oracle DB: ", error);
                return null;
            }
        }
    }
}

module.exports = { databaseQuery };