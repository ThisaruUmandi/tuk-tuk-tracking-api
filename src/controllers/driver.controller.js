import driverModel from "../models/driver.model.js";

const getAllDrivers = async (req, res, next) => {
  try {
    const drivers = await driverModel.getAllDrivers();

    return res.status(200).json({
      success: true,
      message: "Drivers retrieved successfully.",
      data: drivers,
    });
  } catch (error) {
    next(error);
  }
};

const getDriverById = async (req, res, next) => {
  try {
    const driverId = Number(req.params.id);
    const driver = await driverModel.getDriverById(driverId);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Driver retrieved successfully.",
      data: driver,
    });
  } catch (error) {
    next(error);
  }
};

const createDriver = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      nic,
      phone,
      license_number,
      address,
      is_active,
    } = req.body;

    const existingDriverByNic = await driverModel.getDriverByNic(nic);

    if (existingDriverByNic) {
      return res.status(409).json({
        success: false,
        message: "Driver NIC already exists.",
      });
    }

    const existingDriverByLicense =
      await driverModel.getDriverByLicenseNumber(license_number);

    if (existingDriverByLicense) {
      return res.status(409).json({
        success: false,
        message: "Driver license number already exists.",
      });
    }

    const newDriver = await driverModel.createDriver({
      first_name, last_name,
      nic,
      phone,
      license_number,
      address,
      is_active,
    });

    return res.status(201).json({
      success: true,
      message: "Driver created successfully.",
      data: newDriver,
    });
  } catch (error) {
    next(error);
  }
};

const updateDriver = async (req, res, next) => {
  try {
    const driverId = Number(req.params.id);
    const {
      first_name,
      last_name,
      nic,
      phone,
      license_number,
      address,
      is_active,
    } = req.body;

    const existingDriver = await driverModel.getDriverById(driverId);

    if (!existingDriver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found.",
      });
    }

    const driverWithSameNic = await driverModel.getDriverByNic(nic);

    if (driverWithSameNic && driverWithSameNic.id !== driverId) {
      return res.status(409).json({
        success: false,
        message: "Driver NIC already exists.",
      });
    }

    const driverWithSameLicense =
      await driverModel.getDriverByLicenseNumber(license_number);

    if (driverWithSameLicense && driverWithSameLicense.id !== driverId) {
      return res.status(409).json({
        success: false,
        message: "Driver license number already exists.",
      });
    }

    const updatedDriver = await driverModel.updateDriver(driverId, {
      first_name,
      last_name,
      nic,
      phone,
      license_number,
      address,
      is_active,
    });

    return res.status(200).json({
      success: true,
      message: "Driver updated successfully.",
      data: updatedDriver,
    });
  } catch (error) {
    next(error);
  }
};

const deleteDriver = async (req, res, next) => {
  try {
    const driverId = Number(req.params.id);

    const existingDriver = await driverModel.getDriverById(driverId);

    if (!existingDriver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found.",
      });
    }

    const deletedDriver = await driverModel.deleteDriver(driverId);

    return res.status(200).json({
      success: true,
      message: "Driver deleted successfully.",
      data: deletedDriver,
    });
  } catch (error) {
    if (error.code === "23503") {
      return res.status(409).json({
        success: false,
        message: "Driver cannot be deleted because it is referenced by other records.",
      });
    }

    next(error);
  }
};

export {
  getAllDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
};