import databaseConnection from "../config/database.connector.js";

const getAllPoliceStations = async ({ provinceId = null, districtId = null }) => {
  let query = `
    SELECT
      ps.id,
      ps.province_id,
      p.name AS province_name,
      ps.district_id,
      d.name AS district_name,
      ps.name,
      ps.code,
      ps.address,
      ps.phone,
      ps.email,
      ps.is_active,
      ps.created_at,
      ps.updated_at
    FROM police_stations ps
    INNER JOIN provinces p ON ps.province_id = p.id
    INNER JOIN districts d ON ps.district_id = d.id
  `;

  const conditions = [];
  const values = [];

  if (provinceId) {
    values.push(provinceId);
    conditions.push(`ps.province_id = $${values.length}`);
  }

  if (districtId) {
    values.push(districtId);
    conditions.push(`ps.district_id = $${values.length}`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  query += ` ORDER BY ps.id ASC`;

  const result = await databaseConnection.query(query, values);
  return result.rows;
};

const getPoliceStationById = async (policeStationId) => {
  const query = `
    SELECT
      ps.id,
      ps.province_id,
      p.name AS province_name,
      ps.district_id,
      d.name AS district_name,
      ps.name,
      ps.code,
      ps.address,
      ps.phone,
      ps.email,
      ps.is_active,
      ps.created_at,
      ps.updated_at
    FROM police_stations ps
    INNER JOIN provinces p ON ps.province_id = p.id
    INNER JOIN districts d ON ps.district_id = d.id
    WHERE ps.id = $1
  `;
  const result = await databaseConnection.query(query, [policeStationId]);
  return result.rows[0];
};

const getPoliceStationByCode = async (stationCode) => {
  const query = `
    SELECT id, province_id, district_id, name, code, address, phone, email, is_active, created_at, updated_at
    FROM police_stations
    WHERE code = $1
  `;
  const result = await databaseConnection.query(query, [stationCode]);
  return result.rows[0];
};

const provinceExists = async (provinceId) => {
  const query = `SELECT id, name FROM provinces WHERE id = $1`;
  const result = await databaseConnection.query(query, [provinceId]);
  return result.rows[0];
};

const districtExists = async (districtId) => {
  const query = `SELECT id, province_id, name FROM districts WHERE id = $1`;
  const result = await databaseConnection.query(query, [districtId]);
  return result.rows[0];
};

const createPoliceStation = async ({
  province_id,
  district_id,
  name,
  code,
  address,
  phone,
  email,
  is_active,
}) => {
  const query = `
    INSERT INTO police_stations (
      province_id,
      district_id,
      name,
      code,
      address,
      phone,
      email,
      is_active
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id, province_id, district_id, name, code, address, phone, email, is_active, created_at, updated_at
  `;
  const values = [province_id, district_id, name, code, address, phone, email, is_active];
  const result = await databaseConnection.query(query, values);
  return result.rows[0];
};

const updatePoliceStation = async (
  policeStationId,
  {
    province_id,
    district_id,
    name,
    code,
    address,
    phone,
    email,
    is_active,
  }
) => {
  const query = `
    UPDATE police_stations
    SET province_id = $1,
        district_id = $2,
        name = $3,
        code = $4,
        address = $5,
        phone = $6,
        email = $7,
        is_active = $8,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $9
    RETURNING id, province_id, district_id, name, code, address, phone, email, is_active, created_at, updated_at
  `;
  const values = [
    province_id,
    district_id,
    name,
    code,
    address,
    phone,
    email,
    is_active,
    policeStationId,
  ];
  const result = await databaseConnection.query(query, values);
  return result.rows[0];
};

const deletePoliceStation = async (policeStationId) => {
  const query = `
    DELETE FROM police_stations
    WHERE id = $1
    RETURNING id, province_id, district_id, name, code
  `;
  const result = await databaseConnection.query(query, [policeStationId]);
  return result.rows[0];
};

export default {
  getAllPoliceStations,
  getPoliceStationById,
  getPoliceStationByCode,
  provinceExists,
  districtExists,
  createPoliceStation,
  updatePoliceStation,
  deletePoliceStation,
};