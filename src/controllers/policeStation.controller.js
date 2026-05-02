import policeStationModel from "../models/policeStation.model.js";

const getAllPoliceStations = async (req, res, next) => {
  try {
    const provinceId = req.query.province_id
      ? Number(req.query.province_id)
      : null;
    const districtId = req.query.district_id
      ? Number(req.query.district_id)
      : null;

    const policeStations = await policeStationModel.getAllPoliceStations({
      provinceId,
      districtId,
    });

    return res.status(200).json({
      success: true,
      message: "Police stations retrieved successfully.",
      data: policeStations,
    });
  } catch (error) {
    next(error);
  }
};

const getPoliceStationById = async (req, res, next) => {
  try {
    const policeStationId = Number(req.params.id);
    const policeStation = await policeStationModel.getPoliceStationById(policeStationId);

    if (!policeStation) {
      return res.status(404).json({
        success: false,
        message: "Police station not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Police station retrieved successfully.",
      data: policeStation,
    });
  } catch (error) {
    next(error);
  }
};

const createPoliceStation = async (req, res, next) => {
  try {
    const {
      province_id,
      district_id,
      name,
      code,
      address,
      phone,
      email,
      is_active,
    } = req.body;

    const province = await policeStationModel.provinceExists(province_id);

    if (!province) {
      return res.status(404).json({
        success: false,
        message: "Province not found.",
      });
    }

    const district = await policeStationModel.districtExists(district_id);

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

    const existingPoliceStation = await policeStationModel.getPoliceStationByCode(code);

    if (existingPoliceStation) {
      return res.status(409).json({
        success: false,
        message: "Police station code already exists.",
      });
    }

    const newPoliceStation = await policeStationModel.createPoliceStation({
      province_id,
      district_id,
      name,
      code,
      address,
      phone,
      email,
      is_active,
    });

    return res.status(201).json({
      success: true,
      message: "Police station created successfully.",
      data: newPoliceStation,
    });
  } catch (error) {
    next(error);
  }
};

const updatePoliceStation = async (req, res, next) => {
  try {
    const policeStationId = Number(req.params.id);
    const {
      province_id,
      district_id,
      name,
      code,
      address,
      phone,
      email,
      is_active,
    } = req.body;

    const existingPoliceStation = await policeStationModel.getPoliceStationById(policeStationId);

    if (!existingPoliceStation) {
      return res.status(404).json({
        success: false,
        message: "Police station not found.",
      });
    }

    const province = await policeStationModel.provinceExists(province_id);

    if (!province) {
      return res.status(404).json({
        success: false,
        message: "Province not found.",
      });
    }

    const district = await policeStationModel.districtExists(district_id);

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

    const policeStationWithSameCode = await policeStationModel.getPoliceStationByCode(code);

    if (policeStationWithSameCode && policeStationWithSameCode.id !== policeStationId) {
      return res.status(409).json({
        success: false,
        message: "Police station code already exists.",
      });
    }

    const updatedPoliceStation = await policeStationModel.updatePoliceStation(
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
    );

    return res.status(200).json({
      success: true,
      message: "Police station updated successfully.",
      data: updatedPoliceStation,
    });
  } catch (error) {
    next(error);
  }
};

const deletePoliceStation = async (req, res, next) => {
  try {
    const policeStationId = Number(req.params.id);

    const existingPoliceStation = await policeStationModel.getPoliceStationById(policeStationId);

    if (!existingPoliceStation) {
      return res.status(404).json({
        success: false,
        message: "Police station not found.",
      });
    }

    const deletedPoliceStation = await policeStationModel.deletePoliceStation(policeStationId);

    return res.status(200).json({
      success: true,
      message: "Police station deleted successfully.",
      data: deletedPoliceStation,
    });
  } catch (error) {
    if (error.code === "23503") {
      return res.status(409).json({
        success: false,
        message: "Police station cannot be deleted because it is referenced by other records.",
      });
    }

    next(error);
  }
};

export {
  getAllPoliceStations,
  getPoliceStationById,
  createPoliceStation,
  updatePoliceStation,
  deletePoliceStation,
};