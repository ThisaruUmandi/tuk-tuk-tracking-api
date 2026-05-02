import tukTukModel from "../models/tukTuk.model.js";

const getAllTukTuks = async (req, res, next) => {
  try {
    const provinceId = req.query.province_id ? Number(req.query.province_id) : null;
    const districtId = req.query.district_id ? Number(req.query.district_id) : null;
    const policeStationId = req.query.police_station_id
      ? Number(req.query.police_station_id)
      : null;
    const driverId = req.query.driver_id ? Number(req.query.driver_id) : null;
    const status = req.query.status ? req.query.status.trim().toLowerCase() : null;

    const tukTuks = await tukTukModel.getAllTukTuks({
      provinceId,
      districtId,
      policeStationId,
      driverId,
      status,
    });

    return res.status(200).json({
      success: true,
      message: "Tuk-tuks retrieved successfully.",
      data: tukTuks,
    });
  } catch (error) {
    next(error);
  }
};

const getTukTukById = async (req, res, next) => {
  try {
    const tukTukId = Number(req.params.id);
    const tukTuk = await tukTukModel.getTukTukById(tukTukId);

    if (!tukTuk) {
      return res.status(404).json({
        success: false,
        message: "Tuk-tuk not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tuk-tuk retrieved successfully.",
      data: tukTuk,
    });
  } catch (error) {
    next(error);
  }
};

const createTukTuk = async (req, res, next) => {
  try {
    const {
      province_id,
      district_id,
      police_station_id,
      driver_id,
      registration_number,
      status,
      last_latitude,
      last_longitude,
      last_recorded_at,
    } = req.body;

    const province = await tukTukModel.provinceExists(province_id);
    if (!province) {
      return res.status(404).json({
        success: false,
        message: "Province not found.",
      });
    }

    const district = await tukTukModel.districtExists(district_id);
    if (!district) {
      return res.status(404).json({
        success: false,
        message: "District not found.",
      });
    }

    if (district.province_id !== province_id) {
      return res.status(400).json({
        success: false,
        message: "District does not belong to the selected province.",
      });
    }

    const policeStation = await tukTukModel.policeStationExists(police_station_id);
    if (!policeStation) {
      return res.status(404).json({
        success: false,
        message: "Police station not found.",
      });
    }

    if (
      policeStation.province_id !== province_id ||
      policeStation.district_id !== district_id
    ) {
      return res.status(400).json({
        success: false,
        message: "Police station does not belong to the selected province and district.",
      });
    }

    const driver = await tukTukModel.driverExists(driver_id);
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found.",
      });
    }

    const existingTukTuk =
      await tukTukModel.getTukTukByRegistrationNumber(registration_number);

    if (existingTukTuk) {
      return res.status(409).json({
        success: false,
        message: "Registration number already exists.",
      });
    }

    const newTukTuk = await tukTukModel.createTukTuk({
      province_id,
      district_id,
      police_station_id,
      driver_id,
      registration_number,
      status,
      last_latitude,
      last_longitude,
      last_recorded_at,
    });

    return res.status(201).json({
      success: true,
      message: "Tuk-tuk created successfully.",
      data: newTukTuk,
    });
  } catch (error) {
    next(error);
  }
};

const updateTukTuk = async (req, res, next) => {
  try {
    const tukTukId = Number(req.params.id);
    const {
      province_id,
      district_id,
      police_station_id,
      driver_id,
      registration_number,
      status,
      last_latitude,
      last_longitude,
      last_recorded_at,
    } = req.body;

    const existingTukTuk = await tukTukModel.getTukTukById(tukTukId);
    if (!existingTukTuk) {
      return res.status(404).json({
        success: false,
        message: "Tuk-tuk not found.",
      });
    }

    const province = await tukTukModel.provinceExists(province_id);
    if (!province) {
      return res.status(404).json({
        success: false,
        message: "Province not found.",
      });
    }

    const district = await tukTukModel.districtExists(district_id);
    if (!district) {
      return res.status(404).json({
        success: false,
        message: "District not found.",
      });
    }

    if (district.province_id !== province_id) {
      return res.status(400).json({
        success: false,
        message: "District does not belong to the selected province.",
      });
    }

    const policeStation = await tukTukModel.policeStationExists(police_station_id);
    if (!policeStation) {
      return res.status(404).json({
        success: false,
        message: "Police station not found.",
      });
    }

    if (
      policeStation.province_id !== province_id ||
      policeStation.district_id !== district_id
    ) {
      return res.status(400).json({
        success: false,
        message: "Police station does not belong to the selected province and district.",
      });
    }

    const driver = await tukTukModel.driverExists(driver_id);
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found.",
      });
    }

    const tukTukWithSameRegistration =
      await tukTukModel.getTukTukByRegistrationNumber(registration_number);

    if (tukTukWithSameRegistration && tukTukWithSameRegistration.id !== tukTukId) {
      return res.status(409).json({
        success: false,
        message: "Registration number already exists.",
      });
    }

    const updatedTukTuk = await tukTukModel.updateTukTuk(tukTukId, {
      province_id,
      district_id,
      police_station_id,
      driver_id,
      registration_number,
      status,
      last_latitude,
      last_longitude,
      last_recorded_at,
    });

    return res.status(200).json({
      success: true,
      message: "Tuk-tuk updated successfully.",
      data: updatedTukTuk,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTukTuk = async (req, res, next) => {
  try {
    const tukTukId = Number(req.params.id);

    const existingTukTuk = await tukTukModel.getTukTukById(tukTukId);

    if (!existingTukTuk) {
      return res.status(404).json({
        success: false,
        message: "Tuk-tuk not found.",
      });
    }

    const deletedTukTuk = await tukTukModel.deleteTukTuk(tukTukId);

    return res.status(200).json({
      success: true,
      message: "Tuk-tuk deleted successfully.",
      data: deletedTukTuk,
    });
  } catch (error) {
    if (error.code === "23503") {
      return res.status(409).json({
        success: false,
        message: "Tuk-tuk cannot be deleted because it is referenced by other records.",
      });
    }

    next(error);
  }
};

export {
  getAllTukTuks,
  getTukTukById,
  createTukTuk,
  updateTukTuk,
  deleteTukTuk,
};