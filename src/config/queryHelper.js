import pool from "./databaseConnector.js";

const query = (text, params) => pool.query(text, params);

export default query;