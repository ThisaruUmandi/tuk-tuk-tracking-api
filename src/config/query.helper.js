import pool from "./database.connector.js";

const query = (text, params) => pool.query(text, params);

export default query;