import databaseConnection from "../config/database.connector.js";

const getAllUsers = async () => {
  const result = await databaseConnection.query(
    "SELECT id, first_name, last_name, email, role, is_active, created_at FROM users ORDER BY id DESC"
  );
  return result.rows;
};

const getUserById = async (id) => {
  const result = await databaseConnection.query(
    "SELECT id, first_name, last_name, email, role, is_active, created_at FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await databaseConnection.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
};

const createUser = async ({ first_name, last_name, email, password_hash, role }) => {
  const result = await databaseConnection.query(
    `INSERT INTO users (first_name, last_name, email, password_hash, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, first_name, last_name, email, role`,
    [first_name, last_name, email, password_hash, role]
  );
  return result.rows[0];
};

const updateUser = async (id, { first_name, last_name, role, is_active }) => {
  const result = await databaseConnection.query(
    `UPDATE users
     SET first_name = $1,
         last_name = $2,
         role = $3,
         is_active = $4,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $5
     RETURNING id, first_name, last_name, email, role, is_active`,
    [first_name, last_name, role, is_active, id]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  const result = await databaseConnection.query(
    "DELETE FROM users WHERE id = $1 RETURNING id",
    [id]
  );
  return result.rows[0];
};

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};