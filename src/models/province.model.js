import databaseConnection from "../config/database.connector.js";

const getAllProvinces = async () => {
  const query = `
    SELECT id, name, code, created_at, updated_at
    FROM provinces
    ORDER BY id ASC
  `;
  const result = await databaseConnection.query(query);
  return result.rows;
};

const getProvinceById = async (provinceId) => {
  const query = `
    SELECT id, name, code, created_at, updated_at
    FROM provinces
    WHERE id = $1
  `;
  const result = await databaseConnection.query(query, [provinceId]);
  return result.rows[0];
};

const getProvinceByCode = async (provinceCode) => {
  const query = `
    SELECT id, name, code, created_at, updated_at
    FROM provinces
    WHERE code = $1
  `;
  const result = await databaseConnection.query(query, [provinceCode]);
  return result.rows[0];
};

const createProvince = async ({ name, code }) => {
  const query = `
    INSERT INTO provinces (name, code)
    VALUES ($1, $2)
    RETURNING id, name, code, created_at, updated_at
  `;
  const values = [name, code];
  const result = await databaseConnection.query(query, values);
  return result.rows[0];
};

const updateProvince = async (provinceId, { name, code }) => {
  const query = `
    UPDATE provinces
    SET name = $1,
        code = $2,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING id, name, code, created_at, updated_at
  `;
  const values = [name, code, provinceId];
  const result = await databaseConnection.query(query, values);
  return result.rows[0];
};

const deleteProvince = async (provinceId) => {
  const query = `
    DELETE FROM provinces
    WHERE id = $1
    RETURNING id, name, code
  `;
  const result = await databaseConnection.query(query, [provinceId]);
  return result.rows[0];
};

export default {
  getAllProvinces,
  getProvinceById,
  getProvinceByCode,
  createProvince,
  updateProvince,
  deleteProvince,
};