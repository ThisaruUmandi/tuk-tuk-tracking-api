import databaseConnection from "../config/database.connector.js";

const getAllDistricts = async (provinceId = null) => {
  let query = `
    SELECT 
      d.id,
      d.province_id,
      p.name AS province_name,
      d.name,
      d.code,
      d.created_at,
      d.updated_at
    FROM districts d
    INNER JOIN provinces p ON d.province_id = p.id
  `;

  const values = [];

  if (provinceId) {
    query += ` WHERE d.province_id = $1`;
    values.push(provinceId);
  }

  query += ` ORDER BY d.id ASC`;

  const result = await databaseConnection.query(query, values);
  return result.rows;
};

const getDistrictById = async (districtId) => {
  const query = `
    SELECT 
      d.id,
      d.province_id,
      p.name AS province_name,
      d.name,
      d.code,
      d.created_at,
      d.updated_at
    FROM districts d
    INNER JOIN provinces p ON d.province_id = p.id
    WHERE d.id = $1
  `;
  const result = await databaseConnection.query(query, [districtId]);
  return result.rows[0];
};

const getDistrictByCode = async (districtCode) => {
  const query = `
    SELECT id, province_id, name, code, created_at, updated_at
    FROM districts
    WHERE code = $1
  `;
  const result = await databaseConnection.query(query, [districtCode]);
  return result.rows[0];
};

const provinceExists = async (provinceId) => {
  const query = `
    SELECT id, name, code
    FROM provinces
    WHERE id = $1
  `;
  const result = await databaseConnection.query(query, [provinceId]);
  return result.rows[0];
};

const createDistrict = async ({ province_id, name, code }) => {
  const query = `
    INSERT INTO districts (province_id, name, code)
    VALUES ($1, $2, $3)
    RETURNING id, province_id, name, code, created_at, updated_at
  `;
  const values = [province_id, name, code];
  const result = await databaseConnection.query(query, values);
  return result.rows[0];
};

const updateDistrict = async (districtId, { province_id, name, code }) => {
  const query = `
    UPDATE districts
    SET province_id = $1,
        name = $2,
        code = $3,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING id, province_id, name, code, created_at, updated_at
  `;
  const values = [province_id, name, code, districtId];
  const result = await databaseConnection.query(query, values);
  return result.rows[0];
};

const deleteDistrict = async (districtId) => {
  const query = `
    DELETE FROM districts
    WHERE id = $1
    RETURNING id, province_id, name, code
  `;
  const result = await databaseConnection.query(query, [districtId]);
  return result.rows[0];
};

export default {
  getAllDistricts,
  getDistrictById,
  getDistrictByCode,
  provinceExists,
  createDistrict,
  updateDistrict,
  deleteDistrict,
};