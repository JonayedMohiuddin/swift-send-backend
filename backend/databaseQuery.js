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

let connection;

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

async function closeDatabaseConnection() {
    if (connection) {
        try {
            await connection.close();
            console.log("Connection closed.");
        } catch (error) {
            console.error("Error closing connection with Oracle DB: ", error);
        }
    }
}

async function databaseQuery(query, params = [], options = {}) {
    try {
        if (!connection || !(await connection.ping())) {
            await establishDatabaseConnection();
        }

        let result = await connection.execute(query, params, options);

        if (result.rows) {
            console.log("Query Result Returned : ", result.rows.length, " rows");
        } else if (result.rowsAffected) {
            console.log("Rows Affected : ", result.rowsAffected);
        }

        return result;
    } catch (error) {
        console.error("Couldn't execute DB query:", error);
        await closeDatabaseConnection();
        return null;
    }
}



// POOLING FOR MULTIPLE CONNECTIONS TO ORACLE DATABASE

let pool;

async function createPool() {
    try {
        pool = await oracledb.createPool(ORACLE_DATABASE_CREDENTIALS);
        console.log("Connection pool created with Oracle DB.");
    } catch (error) {
        console.error("Error creating connection pool with Oracle DB: ", error);
    }
}

async function closePool() {
    if (pool) {
        try {
            await pool.close();
            console.log("Connection pool closed.");
        } catch (error) {
            console.error("Error closing connection pool with Oracle DB: ", error);
        }
    }
}

async function databaseQueryPooling(query, params = [], options = {}) {
    try {
        if (!pool) {
            await createPool();
        } else if (!(await pool.getConnection().ping())) {
            // Connection is not valid, recreate the pool
            await closePool();
            await createPool();
        }

        let connection = await pool.getConnection();
        let result = await connection.execute(query, params, options);

        if (result.rows) {
            console.log("Query Result Returned : ", result.rows.length, " rows");
        } else if (result.rowsAffected) {
            console.log("Rows Affected : ", result.rowsAffected);
        }

        return result;
    } catch (error) {
        console.error("Couldn't execute DB query:", error);
        await closePool();
        return null;
    }
}

module.exports = { databaseQuery };
