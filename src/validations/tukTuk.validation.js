const allowedStatuses = ["active", "inactive", "flagged"];

const validateTukTukId = (req, res, next) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Tuk-tuk ID must be a positive integer.",
    });
  }

  next();
};

const validateTukTukQuery = (req, res, next) => {
  const { province_id, district_id, police_station_id, driver_id, status } = req.query;

  const checks = [
    { value: province_id, name: "Province ID" },
    { value: district_id, name: "District ID" },
    { value: police_station_id, name: "Police station ID" },
    { value: driver_id, name: "Driver ID" },
  ];

  for (const check of checks) {
    if (
      check.value !== undefined &&
      (!Number.isInteger(Number(check.value)) || Number(check.value) <= 0)
    ) {
      return res.status(400).json({
        success: false,
        message: `${check.name} query parameter must be a positive integer.`,
      });
    }
  }

  if (status !== undefined && !allowedStatuses.includes(status.trim().toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: "Status query parameter must be one of: active, inactive, flagged.",
    });
  }

  next();
};

const validateCreateTukTuk = (req, res, next) => {
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

  const numericChecks = [
    { value: province_id, name: "Province ID" },
    { value: district_id, name: "District ID" },
    { value: police_station_id, name: "Police station ID" },
    { value: driver_id, name: "Driver ID" },
  ];

  for (const check of numericChecks) {
    if (!Number.isInteger(Number(check.value)) || Number(check.value) <= 0) {
      return res.status(400).json({
        success: false,
        message: `${check.name} is required and must be a positive integer.`,
      });
    }
  }

  if (!registration_number || typeof registration_number !== "string" || !registration_number.trim()) {
    return res.status(400).json({
      success: false,
      message: "Registration number is required and must be a non-empty string.",
    });
  }

  if (registration_number.trim().length > 50) {
    return res.status(400).json({
      success: false,
      message: "Registration number must not exceed 50 characters.",
    });
  }

  if (status !== undefined) {
    if (typeof status !== "string" || !allowedStatuses.includes(status.trim().toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Status must be one of: active, inactive, flagged.",
      });
    }
  }

  if (last_latitude !== undefined && last_latitude !== null && Number.isNaN(Number(last_latitude))) {
    return res.status(400).json({
      success: false,
      message: "Last latitude must be a valid number.",
    });
  }

  if (last_longitude !== undefined && last_longitude !== null && Number.isNaN(Number(last_longitude))) {
    return res.status(400).json({
      success: false,
      message: "Last longitude must be a valid number.",
    });
  }

  if (last_recorded_at !== undefined && last_recorded_at !== null) {
    const parsedDate = new Date(last_recorded_at);
    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Last recorded time must be a valid date-time.",
      });
    }
  }

  req.body.province_id = Number(province_id);
  req.body.district_id = Number(district_id);
  req.body.police_station_id = Number(police_station_id);
  req.body.driver_id = Number(driver_id);
  req.body.registration_number = registration_number.trim().toUpperCase();
  req.body.status = status ? status.trim().toLowerCase() : "active";
  req.body.last_latitude =
    last_latitude !== undefined && last_latitude !== null ? Number(last_latitude) : null;
  req.body.last_longitude =
    last_longitude !== undefined && last_longitude !== null ? Number(last_longitude) : null;
  req.body.last_recorded_at = last_recorded_at ? new Date(last_recorded_at) : null;

  next();
};

const validateUpdateTukTuk = (req, res, next) => {
  return validateCreateTukTuk(req, res, next);
};

export {
  validateTukTukId,
  validateTukTukQuery,
  validateCreateTukTuk,
  validateUpdateTukTuk,
};