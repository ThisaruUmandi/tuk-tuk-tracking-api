const validatePoliceStationId = (req, res, next) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Police station ID must be a positive integer.",
    });
  }

  next();
};

const validatePoliceStationQuery = (req, res, next) => {
  const { province_id, district_id } = req.query;

  if (
    province_id !== undefined &&
    (!Number.isInteger(Number(province_id)) || Number(province_id) <= 0)
  ) {
    return res.status(400).json({
      success: false,
      message: "Province ID query parameter must be a positive integer.",
    });
  }

  if (
    district_id !== undefined &&
    (!Number.isInteger(Number(district_id)) || Number(district_id) <= 0)
  ) {
    return res.status(400).json({
      success: false,
      message: "District ID query parameter must be a positive integer.",
    });
  }

  next();
};

const validateCreatePoliceStation = (req, res, next) => {
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

  if (!Number.isInteger(Number(province_id)) || Number(province_id) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Province ID is required and must be a positive integer.",
    });
  }

  if (!Number.isInteger(Number(district_id)) || Number(district_id) <= 0) {
    return res.status(400).json({
      success: false,
      message: "District ID is required and must be a positive integer.",
    });
  }

  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Police station name is required and must be a non-empty string.",
    });
  }

  if (!code || typeof code !== "string" || !code.trim()) {
    return res.status(400).json({
      success: false,
      message: "Police station code is required and must be a non-empty string.",
    });
  }

  if (name.trim().length > 150) {
    return res.status(400).json({
      success: false,
      message: "Police station name must not exceed 150 characters.",
    });
  }

  if (code.trim().length > 20) {
    return res.status(400).json({
      success: false,
      message: "Police station code must not exceed 20 characters.",
    });
  }

  if (phone && typeof phone !== "string") {
    return res.status(400).json({
      success: false,
      message: "Phone must be a string.",
    });
  }

  if (email && typeof email !== "string") {
    return res.status(400).json({
      success: false,
      message: "Email must be a string.",
    });
  }

  if (email && email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: "Email must be a valid email address.",
    });
  }

  if (is_active !== undefined && typeof is_active !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "is_active must be a boolean value.",
    });
  }

  req.body.province_id = Number(province_id);
  req.body.district_id = Number(district_id);
  req.body.name = name.trim();
  req.body.code = code.trim().toUpperCase();
  req.body.address = address ? address.trim() : null;
  req.body.phone = phone ? phone.trim() : null;
  req.body.email = email ? email.trim().toLowerCase() : null;
  req.body.is_active = is_active !== undefined ? is_active : true;

  next();
};

const validateUpdatePoliceStation = (req, res, next) => {
  return validateCreatePoliceStation(req, res, next);
};

export {
  validatePoliceStationId,
  validatePoliceStationQuery,
  validateCreatePoliceStation,
  validateUpdatePoliceStation,
};