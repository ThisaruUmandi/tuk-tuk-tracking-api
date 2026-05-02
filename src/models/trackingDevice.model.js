import databaseConnection from "../config/database.connector.js";

const getAllTrackingDevices = async ({ tukTukId = null, isActive = null }) => {
  let query = `
    SELECT
      td.id,
      td.tuk_tuk_id,
      tt.registration_number,
      td.serial_number,
      td.api_key,
      td.installed_at,
      td.last_seen_at,
      td.is_active,
      td.created_at,
      td.updated_at
    FROM tracking_devices td
    INNER JOIN tuk_tuks tt ON td.tuk_tuk_id = tt.id
  `;

  const conditions = [];
  const values = [];

  if (tukTukId) {
    values.push(tukTukId);
    conditions.push(`td.tuk_tuk_id = $${values.length}`);
  }

  if (isActive !== null) {
    values.push(isActive);
    conditions.push(`td.is_active = $${values.length}`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  query += ` ORDER BY td.id ASC`;

  const result = await databaseConnection.query(query, values);
  return result.rows;
};

const getTrackingDeviceById = async (trackingDeviceId) => {
  const query = `
    SELECT
      td.id,
      td.tuk_tuk_id,
      tt.registration_number,
      td.serial_number,
      td.api_key,
      td.installed_at,
      td.last_seen_at,
      td.is_active,
      td.created_at,
      td.updated_at
    FROM tracking_devices td
    INNER JOIN tuk_tuks tt ON td.tuk_tuk_id = tt.id
    WHERE td.id = $1
  `;
  const result = await databaseConnection.query(query, [trackingDeviceId]);
  return result.rows[0];
};

const getTrackingDeviceBySerialNumber = async (serialNumber) => {
  const query = `
    SELECT
      id,
      tuk_tuk_id,
      serial_number,
      api_key,
      installed_at,
      last_seen_at,
      is_active,
      created_at,
      updated_at
    FROM tracking_devices
    WHERE serial_number = $1
  `;
  const result = await databaseConnection.query(query, [serialNumber]);
  return result.rows[0];
};

const getTrackingDeviceByApiKey = async (apiKey) => {
  const query = `
    SELECT
      id,
      tuk_tuk_id,
      serial_number,
      api_key,
      installed_at,
      last_seen_at,
      is_active,
      created_at,
      updated_at
    FROM tracking_devices
    WHERE api_key = $1
  `;
  const result = await databaseConnection.query(query, [apiKey]);
  return result.rows[0];
};

const getTrackingDeviceByTukTukId = async (tukTukId) => {
  const query = `
    SELECT
      id,
      tuk_tuk_id,
      serial_number,
      api_key,
      installed_at,
      last_seen_at,
      is_active,
      created_at,
      updated_at
    FROM tracking_devices
    WHERE tuk_tuk_id = $1
  `;
  const result = await databaseConnection.query(query, [tukTukId]);
  return result.rows[0];
};

const tukTukExists = async (tukTukId) => {
  const query = `
    SELECT id, registration_number, status
    FROM tuk_tuks
    WHERE id = $1
  `;
  const result = await databaseConnection.query(query, [tukTukId]);
  return result.rows[0];
};

const createTrackingDevice = async ({
  tuk_tuk_id,
  serial_number,
  api_key,
  installed_at,
  last_seen_at,
  is_active,
}) => {
  const query = `
    INSERT INTO tracking_devices (
      tuk_tuk_id,
      serial_number,
      api_key,
      installed_at,
      last_seen_at,
      is_active
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, tuk_tuk_id, serial_number, api_key, installed_at, last_seen_at, is_active, created_at, updated_at
  `;
  const values = [
    tuk_tuk_id,
    serial_number,
    api_key,
    installed_at,
    last_seen_at,
    is_active,
  ];
  const result = await databaseConnection.query(query, values);
  return result.rows[0];
};

const updateTrackingDevice = async (
  trackingDeviceId,
  {
    tuk_tuk_id,
    serial_number,
    api_key,
    installed_at,
    last_seen_at,
    is_active,
  }
) => {
  const query = `
    UPDATE tracking_devices
    SET tuk_tuk_id = $1,
        serial_number = $2,
        api_key = $3,
        installed_at = $4,
        last_seen_at = $5,
        is_active = $6,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $7
    RETURNING id, tuk_tuk_id, serial_number, api_key, installed_at, last_seen_at, is_active, created_at, updated_at
  `;
  const values = [
    tuk_tuk_id,
    serial_number,
    api_key,
    installed_at,
    last_seen_at,
    is_active,
    trackingDeviceId,
  ];
  const result = await databaseConnection.query(query, values);
  return result.rows[0];
};

const deleteTrackingDevice = async (trackingDeviceId) => {
  const query = `
    DELETE FROM tracking_devices
    WHERE id = $1
    RETURNING id, tuk_tuk_id, serial_number
  `;
  const result = await databaseConnection.query(query, [trackingDeviceId]);
  return result.rows[0];
};

export default {
  getAllTrackingDevices,
  getTrackingDeviceById,
  getTrackingDeviceBySerialNumber,
  getTrackingDeviceByApiKey,
  getTrackingDeviceByTukTukId,
  tukTukExists,
  createTrackingDevice,
  updateTrackingDevice,
  deleteTrackingDevice,
};