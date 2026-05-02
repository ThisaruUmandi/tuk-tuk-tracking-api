import districtModel from "../models/district.model.js";

const getAllDistricts = async (req, res, next) => {
  try {
    const provinceId = req.query.province_id
      ? Number(req.query.province_id)
      : null;

    const districts = await districtModel.getAllDistricts(provinceId);

    return res.status(200).json({
      success: true,
      message: "Districts retrieved successfully.",
      data: districts,
    });
  } catch (error) {
    next(error);
  }
};

const getDistrictById = async (req, res, next) => {
  try {
    const districtId = Number(req.params.id);
    const district = await districtModel.getDistrictById(districtId);

    if (!district) {
      return res.status(404).json({
        success: false,
        message: "District not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "District retrieved successfully.",
      data: district,
    });
  } catch (error) {
    next(error);
  }
};

const createDistrict = async (req, res, next) => {
  try {
    const { province_id, name, code } = req.body;

    const province = await districtModel.provinceExists(province_id);

    if (!province) {
      return res.status(404).json({
        success: false,
        message: "Province not found.",
      });
    }

    const existingDistrict = await districtModel.getDistrictByCode(code);

    if (existingDistrict) {
      return res.status(409).json({
        success: false,
        message: "District code already exists.",
      });
    }

    const newDistrict = await districtModel.createDistrict({
      province_id,
      name,
      code,
    });

    return res.status(201).json({
      success: true,
      message: "District created successfully.",
      data: newDistrict,
    });
  } catch (error) {
    next(error);
  }
};

const updateDistrict = async (req, res, next) => {
  try {
    const districtId = Number(req.params.id);
    const { province_id, name, code } = req.body;

    const existingDistrict = await districtModel.getDistrictById(districtId);

    if (!existingDistrict) {
      return res.status(404).json({
        success: false,
        message: "District not found.",
      });
    }

    const province = await districtModel.provinceExists(province_id);

    if (!province) {
      return res.status(404).json({
        success: false,
        message: "Province not found.",
      });
    }

    const districtWithSameCode = await districtModel.getDistrictByCode(code);

    if (districtWithSameCode && districtWithSameCode.id !== districtId) {
      return res.status(409).json({
        success: false,
        message: "District code already exists.",
      });
    }

    const updatedDistrict = await districtModel.updateDistrict(districtId, {
      province_id,
      name,
      code,
    });

    return res.status(200).json({
      success: true,
      message: "District updated successfully.",
      data: updatedDistrict,
    });
  } catch (error) {
    next(error);
  }
};

const deleteDistrict = async (req, res, next) => {
  try {
    const districtId = Number(req.params.id);

    const existingDistrict = await districtModel.getDistrictById(districtId);

    if (!existingDistrict) {
      return res.status(404).json({
        success: false,
        message: "District not found.",
      });
    }

    const deletedDistrict = await districtModel.deleteDistrict(districtId);

    return res.status(200).json({
      success: true,
      message: "District deleted successfully.",
      data: deletedDistrict,
    });
  } catch (error) {
    if (error.code === "23503") {
      return res.status(409).json({
        success: false,
        message: "District cannot be deleted because it is referenced by other records.",
      });
    }

    next(error);
  }
};

export {
  getAllDistricts,
  getDistrictById,
  createDistrict,
  updateDistrict,
  deleteDistrict,
};