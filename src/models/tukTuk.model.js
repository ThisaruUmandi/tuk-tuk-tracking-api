import databaseConnection from "../config/database.connector.js";

const getAllTukTuks = async ({
  provinceId = null,
  districtId = null,
  policeStationId = null,
  driverId = null,
  status = null,
}) => {
  let query = `
    SELECT
      t.id,
      t.province_id,
      p.name AS province_name,
      t.district_id,
      d.name AS district_name,
      t.police_station_id,
      ps.name AS police_station_name,
      t.driver_id,
      dr.first_name || ' ' || dr.last_name AS driver_name,
      t.registration_number,
      t.status,
      t.last_latitude,
      t.last_longitude,
      t.last_recorded_at,
      t.created_at,
      t.updated_at
    FROM tuk_tuks t
    INNER JOIN provinces p ON t.province_id = p.id
    INNER JOIN districts d ON t.district_id = d.id
    INNER JOIN police_stations ps ON t.police_station_id = ps.id
    INNER JOIN drivers dr ON t.driver_id = dr.id
  `;

  const conditions = [];
  const values = [];

  if (provinceId) {
    values.push(provinceId);
    conditions.push(`t.province_id = $${values.length}`);
  }

  if (districtId) {
    values.push(districtId);
    conditions.push(`t.district_id = $${values.length}`);
  }

  if (policeStationId) {
    values.push(policeStationId);
    conditions.push(`t.police_station_id = $${values.length}`);
  }

  if (driverId) {
    values.push(driverId);
    conditions.push(`t.driver_id = $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`t.status = $${values.length}`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  query += ` ORDER BY t.id ASC`;

  const result = await databaseConnection.query(query, values);
  return result.rows;
};

const getTukTukById = async (tukTukId) => {
  const query = `
    SELECT
      t.id,
      t.province_id,
      p.name AS province_name,
      t.district_id,
      d.name AS district_name,
      t.police_station_id,
      ps.name AS police_station_name,
      t.driver_id,
      dr.first_name || ' ' || dr.last_name AS driver_name,
      t.registration_number,
      t.status,
      t.last_latitude,
      t.last_longitude,
      t.last_recorded_at,
      t.created_at,
      t.updated_at
    FROM tuk_tuks t
    INNER JOIN provinces p ON t.province_id = p.id
    INNER JOIN districts d ON t.district_id = d.id
    INNER JOIN police_stations ps ON t.police_station_id = ps.id
    INNER JOIN drivers dr ON t.driver_id = dr.id
    WHERE t.id = $1
  `;
  const result = await databaseConnection.query(query, [tukTukId]);
  return result.rows[0];
};

const getTukTukByRegistrationNumber = async (registrationNumber) => {
  const query = `
    SELECT
      id,
      province_id,
      district_id,
      police_station_id,
      driver_id,
      registration_number,
      status,
      last_latitude,
      last_longitude,
      last_recorded_at,
      created_at,
      updated_at
    FROM tuk_tuks
    WHERE registration_number = $1
  `;
  const result = await databaseConnection.query(query, [registrationNumber]);
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

const policeStationExists = async (policeStationId) => {
  const query = `
    SELECT id, province_id, district_id, name
    FROM police_stations
    WHERE id = $1
  `;
  const result = await databaseConnection.query(query, [policeStationId]);
  return result.rows[0];
};

const driverExists = async (driverId) => {
  const query = `
    SELECT id, first_name, last_name, is_active
    FROM drivers
    WHERE id = $1
  `;
  const result = await databaseConnection.query(query, [driverId]);
  return result.rows[0];
};

const createTukTuk = async ({
  province_id,
  district_id,
  police_station_id,
  driver_id,
  registration_number,
  status,
  last_latitude,
  last_longitude,
  last_recorded_at,
}) => {
  const query = `
    INSERT INTO tuk_tuks (
      province_id,
      district_id,
      police_station_id,
      driver_id,
      registration_number,
      status,
      last_latitude,
      last_longitude,
      last_recorded_at
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id, province_id, district_id, police_station_id, driver_id, registration_number, status, last_latitude, last_longitude, last_recorded_at, created_at, updated_at
  `;
  const values = [
    province_id,
    district_id,
    police_station_id,
    driver_id,
    registration_number,
    status,
    last_latitude,
    last_longitude,
    last_recorded_at,
  ];
  const result = await databaseConnection.query(query, values);
  return result.rows[0];
};

const updateTukTuk = async (
  tukTukId,
  {
    province_id,
    district_id,
    police_station_id,
    driver_id,
    registration_number,
    status,
    last_latitude,
    last_longitude,
    last_recorded_at,
  }
) => {
  const query = `
    UPDATE tuk_tuks
    SET province_id = $1,
        district_id = $2,
        police_station_id = $3,
        driver_id = $4,
        registration_number = $5,
        status = $6,
        last_latitude = $7,
        last_longitude = $8,
        last_recorded_at = $9,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $10
    RETURNING id, province_id, district_id, police_station_id, driver_id, registration_number, status, last_latitude, last_longitude, last_recorded_at, created_at, updated_at
  `;
  const values = [
    province_id,
    district_id,
    police_station_id,
    driver_id,
    registration_number,
    status,
    last_latitude,
    last_longitude,
    last_recorded_at,
    tukTukId,
  ];
  const result = await databaseConnection.query(query, values);
  return result.rows[0];
};

const deleteTukTuk = async (tukTukId) => {
  const query = `
    DELETE FROM tuk_tuks
    WHERE id = $1
    RETURNING id, registration_number, status
  `;
  const result = await databaseConnection.query(query, [tukTukId]);
  return result.rows[0];
};

export default {
  getAllTukTuks,
  getTukTukById,
  getTukTukByRegistrationNumber,
  provinceExists,
  districtExists,
  policeStationExists,
  driverExists,
  createTukTuk,
  updateTukTuk,
  deleteTukTuk,
};