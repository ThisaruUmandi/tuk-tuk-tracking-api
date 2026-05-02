import locationLogModel from "../models/locationLog.model.js";

const getAllLocationLogs = async (req, res, next) => {
  try {
    const tukTukId = req.query.tuk_tuk_id ? Number(req.query.tuk_tuk_id) : null;
    const trackingDeviceId = req.query.tracking_device_id
      ? Number(req.query.tracking_device_id)
      : null;
    const policeStationId = req.query.police_station_id
      ? Number(req.query.police_station_id)
      : null;
    const source = req.query.source ? req.query.source.trim().toLowerCase() : null;
    const from = req.query.from ? new Date(req.query.from) : null;
    const to = req.query.to ? new Date(req.query.to) : null;

    const locationLogs = await locationLogModel.getAllLocationLogs({
      tukTukId,
      trackingDeviceId,
      policeStationId,
      source,
      from,
      to,
    });

    return res.status(200).json({
      success: true,
      message: "Location logs retrieved successfully.",
      data: locationLogs,
    });
  } catch (error) {
    next(error);
  }
};

const getLocationLogById = async (req, res, next) => {
  try {
    const locationLogId = Number(req.params.id);
    const locationLog = await locationLogModel.getLocationLogById(locationLogId);

    if (!locationLog) {
      return res.status(404).json({
        success: false,
        message: "Location log not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Location log retrieved successfully.",
      data: locationLog,
    });
  } catch (error) {
    next(error);
  }
};

const createLocationLog = async (req, res, next) => {
  try {
    const {
      tuk_tuk_id,
      tracking_device_id,
      police_station_id,
      latitude,
      longitude,
      speed,
      heading,
      recorded_at,
      source,
    } = req.body;

    const tukTuk = await locationLogModel.tukTukExists(tuk_tuk_id);
    if (!tukTuk) {
      return res.status(404).json({
        success: false,
        message: "Tuk-tuk not found.",
      });
    }

    const trackingDevice =
      await locationLogModel.trackingDeviceExists(tracking_device_id);
    if (!trackingDevice) {
      return res.status(404).json({
        success: false,
        message: "Tracking device not found.",
      });
    }

    if (trackingDevice.tuk_tuk_id !== tuk_tuk_id) {
      return res.status(400).json({
        success: false,
        message: "Tracking device does not belong to the selected tuk-tuk.",
      });
    }

    const policeStation =
      await locationLogModel.policeStationExists(police_station_id);
    if (!policeStation) {
      return res.status(404).json({
        success: false,
        message: "Police station not found.",
      });
    }

    const newLocationLog = await locationLogModel.createLocationLog({
      tuk_tuk_id,
      tracking_device_id,
      police_station_id,
      latitude,
      longitude,
      speed,
      heading,
      recorded_at,
      source,
    });

    await locationLogModel.updateTukTukLatestLocation({
      tuk_tuk_id,
      latitude,
      longitude,
      recorded_at,
    });

    await locationLogModel.updateTrackingDeviceLastSeen({
      tracking_device_id,
      last_seen_at: recorded_at,
    });

    return res.status(201).json({
      success: true,
      message: "Location log created successfully.",
      data: newLocationLog,
    });
  } catch (error) {
    next(error);
  }
};

const deleteLocationLog = async (req, res, next) => {
  try {
    const locationLogId = Number(req.params.id);

    const existingLocationLog =
      await locationLogModel.getLocationLogById(locationLogId);

    if (!existingLocationLog) {
      return res.status(404).json({
        success: false,
        message: "Location log not found.",
      });
    }

    const deletedLocationLog =
      await locationLogModel.deleteLocationLog(locationLogId);

    return res.status(200).json({
      success: true,
      message: "Location log deleted successfully.",
      data: deletedLocationLog,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllLocationLogs,
  getLocationLogById,
  createLocationLog,
  deleteLocationLog,
};