const validateTrackingDeviceId = (req, res, next) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Tracking device ID must be a positive integer.",
    });
  }

  next();
};

const validateTrackingDeviceQuery = (req, res, next) => {
  const { tuk_tuk_id, is_active } = req.query;

  if (
    tuk_tuk_id !== undefined &&
    (!Number.isInteger(Number(tuk_tuk_id)) || Number(tuk_tuk_id) <= 0)
  ) {
    return res.status(400).json({
      success: false,
      message: "Tuk-tuk ID query parameter must be a positive integer.",
    });
  }

  if (
    is_active !== undefined &&
    !["true", "false"].includes(String(is_active).toLowerCase())
  ) {
    return res.status(400).json({
      success: false,
      message: "is_active query parameter must be true or false.",
    });
  }

  next();
};

const validateCreateTrackingDevice = (req, res, next) => {
  const {
    tuk_tuk_id,
    serial_number,
    api_key,
    installed_at,
    last_seen_at,
    is_active,
  } = req.body;

  if (!Number.isInteger(Number(tuk_tuk_id)) || Number(tuk_tuk_id) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Tuk-tuk ID is required and must be a positive integer.",
    });
  }

  if (!serial_number || typeof serial_number !== "string" || !serial_number.trim()) {
    return res.status(400).json({
      success: false,
      message: "Serial number is required and must be a non-empty string.",
    });
  }

  if (!api_key || typeof api_key !== "string" || !api_key.trim()) {
    return res.status(400).json({
      success: false,
      message: "API key is required and must be a non-empty string.",
    });
  }

  if (serial_number.trim().length > 100) {
    return res.status(400).json({
      success: false,
      message: "Serial number must not exceed 100 characters.",
    });
  }

  if (api_key.trim().length > 255) {
    return res.status(400).json({
      success: false,
      message: "API key must not exceed 255 characters.",
    });
  }

  if (installed_at !== undefined && installed_at !== null) {
    const installedDate = new Date(installed_at);
    if (Number.isNaN(installedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Installed date must be a valid date-time.",
      });
    }
  }

  if (last_seen_at !== undefined && last_seen_at !== null) {
    const lastSeenDate = new Date(last_seen_at);
    if (Number.isNaN(lastSeenDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Last seen date must be a valid date-time.",
      });
    }
  }

  if (is_active !== undefined && typeof is_active !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "is_active must be a boolean value.",
    });
  }

  req.body.tuk_tuk_id = Number(tuk_tuk_id);
  req.body.serial_number = serial_number.trim().toUpperCase();
  req.body.api_key = api_key.trim();
  req.body.installed_at = installed_at ? new Date(installed_at) : null;
  req.body.last_seen_at = last_seen_at ? new Date(last_seen_at) : null;
  req.body.is_active = is_active !== undefined ? is_active : true;

  next();
};

const validateUpdateTrackingDevice = (req, res, next) => {
  return validateCreateTrackingDevice(req, res, next);
};

export {
  validateTrackingDeviceId,
  validateTrackingDeviceQuery,
  validateCreateTrackingDevice,
  validateUpdateTrackingDevice,
};