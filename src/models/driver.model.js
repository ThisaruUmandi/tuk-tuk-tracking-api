import databaseConnection from "../config/database.connector.js";

const getAllDrivers = async () => {
  const query = `
    SELECT id, first_name, last_name, nic, phone, license_number, address, is_active, created_at, updated_at
    FROM drivers
    ORDER BY id ASC
  `;
  const result = await databaseConnection.query(query);
  return result.rows;
};

const getDriverById = async (driverId) => {
  const query = `
    SELECT id, first_name, last_name, nic, phone, license_number, address, is_active, created_at, updated_at
    FROM drivers
    WHERE id = $1
  `;
  const result = await databaseConnection.query(query, [driverId]);
  return result.rows[0];
};

const getDriverByNic = async (nic) => {
  const query = `
    SELECT id, first_name, last_name, nic, phone, license_number, address, is_active, created_at, updated_at
    FROM drivers
    WHERE nic = $1
  `;
  const result = await databaseConnection.query(query, [nic]);
  return result.rows[0];
};

const getDriverByLicenseNumber = async (licenseNumber) => {
  const query = `
    SELECT id, first_name, last_name, nic, phone, license_number, address, is_active, created_at, updated_at
    FROM drivers
    WHERE license_number = $1
  `;
  const result = await databaseConnection.query(query, [licenseNumber]);
  return result.rows[0];
};

const createDriver = async ({
  first_name,
  last_name,
  nic,
  phone,
  license_number,
  address,
  is_active,
}) => {
  const query = `
    INSERT INTO drivers (
      first_name,
      last_name,
      nic,
      phone,
      license_number,
      address,
      is_active
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, first_name, last_name, nic, phone, license_number, address, is_active, created_at, updated_at
  `;
  const values = [first_name, last_name, nic, phone, license_number, address, is_active];
  const result = await databaseConnection.query(query, values);
  return result.rows[0];
};

const updateDriver = async (
  driverId,
  {
    first_name, 
    last_name,
    nic,
    phone,
    license_number,
    address,
    is_active,
  }
) => {
  const query = `
    UPDATE drivers
    SET first_name = $1,
        last_name = $2,
        nic = $3,
        phone = $4,
        license_number = $5,
        address = $6,
        is_active = $7,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $8
    RETURNING id, first_name, last_name, nic, phone, license_number, address, is_active, created_at, updated_at
  `;
  const values = [
    first_name,
    last_name,
    nic,
    phone,
    license_number,
    address,
    is_active,
    driverId,
  ];
  const result = await databaseConnection.query(query, values);
  return result.rows[0];
};

const deleteDriver = async (driverId) => {
  const query = `
    DELETE FROM drivers
    WHERE id = $1
    RETURNING id, first_name, last_name, nic, license_number
  `;
  const result = await databaseConnection.query(query, [driverId]);
  return result.rows[0];
};

export default {
  getAllDrivers,
  getDriverById,
  getDriverByNic,
  getDriverByLicenseNumber,
  createDriver,
  updateDriver,
  deleteDriver,
};