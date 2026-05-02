import trackingDeviceModel from "../models/trackingDevice.model.js";

const getAllTrackingDevices = async (req, res, next) => {
  try {
    const tukTukId = req.query.tuk_tuk_id ? Number(req.query.tuk_tuk_id) : null;
    const isActive =
      req.query.is_active !== undefined
        ? String(req.query.is_active).toLowerCase() === "true"
        : null;

    const trackingDevices = await trackingDeviceModel.getAllTrackingDevices({
      tukTukId,
      isActive,
    });

    return res.status(200).json({
      success: true,
      message: "Tracking devices retrieved successfully.",
      data: trackingDevices,
    });
  } catch (error) {
    next(error);
  }
};

const getTrackingDeviceById = async (req, res, next) => {
  try {
    const trackingDeviceId = Number(req.params.id);
    const trackingDevice = await trackingDeviceModel.getTrackingDeviceById(trackingDeviceId);

    if (!trackingDevice) {
      return res.status(404).json({
        success: false,
        message: "Tracking device not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tracking device retrieved successfully.",
      data: trackingDevice,
    });
  } catch (error) {
    next(error);
  }
};

const createTrackingDevice = async (req, res, next) => {
  try {
    const {
      tuk_tuk_id,
      serial_number,
      api_key,
      installed_at,
      last_seen_at,
      is_active,
    } = req.body;

    const tukTuk = await trackingDeviceModel.tukTukExists(tuk_tuk_id);

    if (!tukTuk) {
      return res.status(404).json({
        success: false,
        message: "Tuk-tuk not found.",
      });
    }

    const existingByTukTuk = await trackingDeviceModel.getTrackingDeviceByTukTukId(tuk_tuk_id);

    if (existingByTukTuk) {
      return res.status(409).json({
        success: false,
        message: "This tuk-tuk already has an assigned tracking device.",
      });
    }

    const existingBySerial =
      await trackingDeviceModel.getTrackingDeviceBySerialNumber(serial_number);

    if (existingBySerial) {
      return res.status(409).json({
        success: false,
        message: "Tracking device serial number already exists.",
      });
    }

    const existingByApiKey =
      await trackingDeviceModel.getTrackingDeviceByApiKey(api_key);

    if (existingByApiKey) {
      return res.status(409).json({
        success: false,
        message: "Tracking device API key already exists.",
      });
    }

    const newTrackingDevice = await trackingDeviceModel.createTrackingDevice({
      tuk_tuk_id,
      serial_number,
      api_key,
      installed_at,
      last_seen_at,
      is_active,
    });

    return res.status(201).json({
      success: true,
      message: "Tracking device created successfully.",
      data: newTrackingDevice,
    });
  } catch (error) {
    next(error);
  }
};

const updateTrackingDevice = async (req, res, next) => {
  try {
    const trackingDeviceId = Number(req.params.id);
    const {
      tuk_tuk_id,
      serial_number,
      api_key,
      installed_at,
      last_seen_at,
      is_active,
    } = req.body;

    const existingTrackingDevice =
      await trackingDeviceModel.getTrackingDeviceById(trackingDeviceId);

    if (!existingTrackingDevice) {
      return res.status(404).json({
        success: false,
        message: "Tracking device not found.",
      });
    }

    const tukTuk = await trackingDeviceModel.tukTukExists(tuk_tuk_id);

    if (!tukTuk) {
      return res.status(404).json({
        success: false,
        message: "Tuk-tuk not found.",
      });
    }

    const existingByTukTuk = await trackingDeviceModel.getTrackingDeviceByTukTukId(tuk_tuk_id);

    if (existingByTukTuk && existingByTukTuk.id !== trackingDeviceId) {
      return res.status(409).json({
        success: false,
        message: "This tuk-tuk already has an assigned tracking device.",
      });
    }

    const existingBySerial =
      await trackingDeviceModel.getTrackingDeviceBySerialNumber(serial_number);

    if (existingBySerial && existingBySerial.id !== trackingDeviceId) {
      return res.status(409).json({
        success: false,
        message: "Tracking device serial number already exists.",
      });
    }

    const existingByApiKey =
      await trackingDeviceModel.getTrackingDeviceByApiKey(api_key);

    if (existingByApiKey && existingByApiKey.id !== trackingDeviceId) {
      return res.status(409).json({
        success: false,
        message: "Tracking device API key already exists.",
      });
    }

    const updatedTrackingDevice = await trackingDeviceModel.updateTrackingDevice(
      trackingDeviceId,
      {
        tuk_tuk_id,
        serial_number,
        api_key,
        installed_at,
        last_seen_at,
        is_active,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Tracking device updated successfully.",
      data: updatedTrackingDevice,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTrackingDevice = async (req, res, next) => {
  try {
    const trackingDeviceId = Number(req.params.id);

    const existingTrackingDevice =
      await trackingDeviceModel.getTrackingDeviceById(trackingDeviceId);

    if (!existingTrackingDevice) {
      return res.status(404).json({
        success: false,
        message: "Tracking device not found.",
      });
    }

    const deletedTrackingDevice =
      await trackingDeviceModel.deleteTrackingDevice(trackingDeviceId);

    return res.status(200).json({
      success: true,
      message: "Tracking device deleted successfully.",
      data: deletedTrackingDevice,
    });
  } catch (error) {
    if (error.code === "23503") {
      return res.status(409).json({
        success: false,
        message: "Tracking device cannot be deleted because it is referenced by other records.",
      });
    }

    next(error);
  }
};

export {
  getAllTrackingDevices,
  getTrackingDeviceById,
  createTrackingDevice,
  updateTrackingDevice,
  deleteTrackingDevice,
};