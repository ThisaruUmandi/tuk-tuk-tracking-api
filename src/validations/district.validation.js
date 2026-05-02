const validateDistrictId = (req, res, next) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    return res.status(400).json({
      success: false,
      message: "District ID must be a positive integer.",
    });
  }

  next();
};

const validateCreateDistrict = (req, res, next) => {
  const { name, code, province_id } = req.body;

  // name validation
  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "District name is required and must be a non-empty string.",
    });
  }

  if (name.trim().length > 100) {
    return res.status(400).json({
      success: false,
      message: "District name must not exceed 100 characters.",
    });
  }

  // code validation
  if (!code || typeof code !== "string" || !code.trim()) {
    return res.status(400).json({
      success: false,
      message: "District code is required and must be a non-empty string.",
    });
  }

  if (code.trim().length > 10) {
    return res.status(400).json({
      success: false,
      message: "District code must not exceed 10 characters.",
    });
  }

  // province_id validation (FK)
  if (
    province_id === undefined ||
    !Number.isInteger(Number(province_id)) ||
    Number(province_id) <= 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Province ID is required and must be a positive integer.",
    });
  }

  // sanitize
  req.body.name = name.trim();
  req.body.code = code.trim().toUpperCase();
  req.body.province_id = Number(province_id);

  next();
};

const validateUpdateDistrict = (req, res, next) => {
  return validateCreateDistrict(req, res, next);
};

export {
  validateDistrictId,
  validateCreateDistrict,
  validateUpdateDistrict,
};