const validateProvinceId = (req, res, next) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Province ID must be a positive integer.",
    });
  }

  next();
};

const validateCreateProvince = (req, res, next) => {
  const { name, code } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Province name is required and must be a non-empty string.",
    });
  }

  if (!code || typeof code !== "string" || !code.trim()) {
    return res.status(400).json({
      success: false,
      message: "Province code is required and must be a non-empty string.",
    });
  }

  if (name.trim().length > 100) {
    return res.status(400).json({
      success: false,
      message: "Province name must not exceed 100 characters.",
    });
  }

  if (code.trim().length > 10) {
    return res.status(400).json({
      success: false,
      message: "Province code must not exceed 10 characters.",
    });
  }

  req.body.name = name.trim();
  req.body.code = code.trim().toUpperCase();

  next();
};

const validateUpdateProvince = (req, res, next) => {
  return validateCreateProvince(req, res, next);
};

export {
  validateProvinceId,
  validateCreateProvince,
  validateUpdateProvince,
};