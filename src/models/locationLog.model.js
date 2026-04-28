import databaseConnection from "../config/database.connection.js";

const getAllLocationLogs = async ({
  tukTukId = null,
  trackingDeviceId = null,
  policeStationId = null,
  source = null,
  from = null,
  to = null,
}) => {
  let query = `
    SELECT
      ll.id,
      ll.tuk_tuk_id,
      tt.registration_number,
      ll.tracking_device_id,
      td.serial_number,
      ll.police_station_id,
      ps.name AS police_station_name,
      ll.latitude,
      ll.longitude,
      ll.speed,
      ll.heading,
      ll.recorded_at,
      ll.source,
      ll.created_at
    FROM location_logs ll
    INNER JOIN tuk_tuks tt ON ll.tuk_tuk_id = tt.id
    INNER JOIN tracking_devices td ON ll.tracking_device_id = td.id
    INNER JOIN police_stations ps ON ll.police_station_id = ps.id
  `;

  const conditions = [];
  const values = [];

  if (tukTukId) {
    values.push(tukTukId);
    conditions.push(`ll.tuk_tuk_id = $${values.length}`);
  }

  if (trackingDeviceId) {
    values.push(trackingDeviceId);
    conditions.push(`ll.tracking_device_id = $${values.length}`);
  }

  if (policeStationId) {
    values.push(policeStationId);
    conditions.push(`ll.police_station_id = $${values.length}`);
  }

  if (source) {
    values.push(source);
    conditions.push(`ll.source = $${values.length}`);
  }

  if (from) {
    values.push(from);
    conditions.push(`ll.recorded_at >= $${values.length}`);
  }

  if (to) {
    values.push(to);
    conditions.push(`ll.recorded_at <= $${values.length}`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  query += ` ORDER BY ll.recorded_at DESC, ll.id DESC`;

  const result = await databaseConnection.query(query, values);
  return result.rows;
};

const getLocationLogById = async (locationLogId) => {
  const query = `
    SELECT
      ll.id,
      ll.tuk_tuk_id,
      tt.registration_number,
      ll.tracking_device_id,
      td.serial_number,
      ll.police_station_id,
      ps.name AS police_station_name,
      ll.latitude,
      ll.longitude,
      ll.speed,
      ll.heading,
      ll.recorded_at,
      ll.source,
      ll.created_at
    FROM location_logs ll
    INNER JOIN tuk_tuks tt ON ll.tuk_tuk_id = tt.id
    INNER JOIN tracking_devices td ON ll.tracking_device_id = td.id
    INNER JOIN police_stations ps ON ll.police_station_id = ps.id
    WHERE ll.id = $1
  `;
  const result = await databaseConnection.query(query, [locationLogId]);
  return result.rows[0];
};

const tukTukExists = async (tukTukId) => {
  const query = `
    SELECT id, registration_number
    FROM tuk_tuks
    WHERE id = $1
  `;
  const result = await databaseConnection.query(query, [tukTukId]);
  return result.rows[0];
};

const trackingDeviceExists = async (trackingDeviceId) => {
  const query = `
    SELECT id, tuk_tuk_id, serial_number, is_active
    FROM tracking_devices
    WHERE id = $1
  `;
  const result = await databaseConnection.query(query, [trackingDeviceId]);
  return result.rows[0];
};

const policeStationExists = async (policeStationId) => {
  const query = `
    SELECT id, name
    FROM police_stations
    WHERE id = $1
  `;
  const result = await databaseConnection.query(query, [policeStationId]);
  return result.rows[0];
};

const createLocationLog = async ({
  tuk_tuk_id,
  tracking_device_id,
  police_station_id,
  latitude,
  longitude,
  speed,
  heading,
  recorded_at,
  source,
}) => {
  const query = `
    INSERT INTO location_logs (
      tuk_tuk_id,
      tracking_device_id,
      police_station_id,
      latitude,
      longitude,
      speed,
      heading,
      recorded_at,
      source
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id, tuk_tuk_id, tracking_device_id, police_station_id, latitude, longitude, speed, heading, recorded_at, source, created_at
  `;
  const values = [
    tuk_tuk_id,
    tracking_device_id,
    police_station_id,
    latitude,
    longitude,
    speed,
    heading,
    recorded_at,
    source,
  ];
  const result = await databaseConnection.query(query, values);
  return result.rows[0];
};

const updateTukTukLatestLocation = async ({
  tuk_tuk_id,
  latitude,
  longitude,
  recorded_at,
}) => {
  const query = `
    UPDATE tuk_tuks
    SET last_latitude = $1,
        last_longitude = $2,
        last_recorded_at = $3,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
  `;
  const values = [latitude, longitude, recorded_at, tuk_tuk_id];
  await databaseConnection.query(query, values);
};

const updateTrackingDeviceLastSeen = async ({
  tracking_device_id,
  last_seen_at,
}) => {
  const query = `
    UPDATE tracking_devices
    SET last_seen_at = $1,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
  `;
  const values = [last_seen_at, tracking_device_id];
  await databaseConnection.query(query, values);
};

const deleteLocationLog = async (locationLogId) => {
  const query = `
    DELETE FROM location_logs
    WHERE id = $1
    RETURNING id, tuk_tuk_id, tracking_device_id, police_station_id, recorded_at
  `;
  const result = await databaseConnection.query(query, [locationLogId]);
  return result.rows[0];
};

export default {
  getAllLocationLogs,
  getLocationLogById,
  tukTukExists,
  trackingDeviceExists,
  policeStationExists,
  createLocationLog,
  updateTukTukLatestLocation,
  updateTrackingDeviceLastSeen,
  deleteLocationLog,
};