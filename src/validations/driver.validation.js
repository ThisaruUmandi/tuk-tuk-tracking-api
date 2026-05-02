const validateDriverId = (req, res, next) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Driver ID must be a positive integer.",
    });
  }

  next();
};

const validateCreateDriver = (req, res, next) => {
  const {
    first_name,
    last_name,
    nic,
    phone,
    license_number,
    address,
    is_active,
  } = req.body;

  if (!first_name || typeof first_name !== "string" || !first_name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Driver first name is required and must be a non-empty string.",
    });
  }

  if (!last_name || typeof last_name !== "string" || !last_name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Driver last name is required and must be a non-empty string.",
    });
  }

  if (!nic || typeof nic !== "string" || !nic.trim()) {
    return res.status(400).json({
      success: false,
      message: "Driver NIC is required and must be a non-empty string.",
    });
  }

  if (!phone || typeof phone !== "string" || !phone.trim()) {
    return res.status(400).json({
      success: false,
      message: "Driver phone is required and must be a non-empty string.",
    });
  }

  if (
    !license_number ||
    typeof license_number !== "string" ||
    !license_number.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Driver license number is required and must be a non-empty string.",
    });
  }

  if (first_name.trim().length > 150) {
    return res.status(400).json({
      success: false,
      message: "Driver first name must not exceed 150 characters.",
    });
  }

  if (last_name.trim().length > 150) {
    return res.status(400).json({
      success: false,
      message: "Driver last name must not exceed 150 characters.",
    });
  }

  if (nic.trim().length > 20) {
    return res.status(400).json({
      success: false,
      message: "Driver NIC must not exceed 20 characters.",
    });
  }

  if (phone.trim().length > 20) {
    return res.status(400).json({
      success: false,
      message: "Driver phone must not exceed 20 characters.",
    });
  }

  if (license_number.trim().length > 50) {
    return res.status(400).json({
      success: false,
      message: "Driver license number must not exceed 50 characters.",
    });
  }

  if (address && typeof address !== "string") {
    return res.status(400).json({
      success: false,
      message: "Address must be a string.",
    });
  }

  if (is_active !== undefined && typeof is_active !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "is_active must be a boolean value.",
    });
  }

  req.body.first_name = first_name.trim();
  req.body.last_name = last_name.trim();
  req.body.nic = nic.trim().toUpperCase();
  req.body.phone = phone.trim();
  req.body.license_number = license_number.trim().toUpperCase();
  req.body.address = address ? address.trim() : null;
  req.body.is_active = is_active !== undefined ? is_active : true;

  next();
};

const validateUpdateDriver = (req, res, next) => {
  return validateCreateDriver(req, res, next);
};

export {
  validateDriverId,
  validateCreateDriver,
  validateUpdateDriver,
};