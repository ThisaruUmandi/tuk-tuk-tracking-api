import provinceModel from "../models/province.model.js";

const getAllProvinces = async (req, res, next) => {
  try {
    const provinces = await provinceModel.getAllProvinces();

    return res.status(200).json({
      success: true,
      message: "Provinces retrieved successfully.",
      data: provinces,
    });
  } catch (error) {
    next(error);
  }
};

const getProvinceById = async (req, res, next) => {
  try {
    const provinceId = Number(req.params.id);
    const province = await provinceModel.getProvinceById(provinceId);

    if (!province) {
      return res.status(404).json({
        success: false,
        message: "Province not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Province retrieved successfully.",
      data: province,
    });
  } catch (error) {
    next(error);
  }
};

const createProvince = async (req, res, next) => {
  try {
    const { name, code } = req.body;

    const existingProvince = await provinceModel.getProvinceByCode(code);

    if (existingProvince) {
      return res.status(409).json({
        success: false,
        message: "Province code already exists.",
      });
    }

    const newProvince = await provinceModel.createProvince({ name, code });

    return res.status(201).json({
      success: true,
      message: "Province created successfully.",
      data: newProvince,
    });
  } catch (error) {
    next(error);
  }
};

const updateProvince = async (req, res, next) => {
  try {
    const provinceId = Number(req.params.id);
    const { name, code } = req.body;

    const existingProvince = await provinceModel.getProvinceById(provinceId);

    if (!existingProvince) {
      return res.status(404).json({
        success: false,
        message: "Province not found.",
      });
    }

    const provinceWithSameCode = await provinceModel.getProvinceByCode(code);

    if (provinceWithSameCode && provinceWithSameCode.id !== provinceId) {
      return res.status(409).json({
        success: false,
        message: "Province code already exists.",
      });
    }

    const updatedProvince = await provinceModel.updateProvince(provinceId, {
      name,
      code,
    });

    return res.status(200).json({
      success: true,
      message: "Province updated successfully.",
      data: updatedProvince,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProvince = async (req, res, next) => {
  try {
    const provinceId = Number(req.params.id);

    const existingProvince = await provinceModel.getProvinceById(provinceId);

    if (!existingProvince) {
      return res.status(404).json({
        success: false,
        message: "Province not found.",
      });
    }

    const deletedProvince = await provinceModel.deleteProvince(provinceId);

    return res.status(200).json({
      success: true,
      message: "Province deleted successfully.",
      data: deletedProvince,
    });
  } catch (error) {
    if (error.code === "23503") {
      return res.status(409).json({
        success: false,
        message: "Province cannot be deleted because it is referenced by other records.",
      });
    }

    next(error);
  }
};

export {
  getAllProvinces,
  getProvinceById,
  createProvince,
  updateProvince,
  deleteProvince,
};