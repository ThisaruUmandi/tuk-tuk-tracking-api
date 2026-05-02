const allowedSources = ["gps", "simulated", "manual"];

const validateLocationLogId = (req, res, next) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Location log ID must be a positive integer.",
    });
  }

  next();
};

const validateLocationLogQuery = (req, res, next) => {
  const {
    tuk_tuk_id,
    tracking_device_id,
    police_station_id,
    source,
    from,
    to,
  } = req.query;

  const checks = [
    { value: tuk_tuk_id, name: "Tuk-tuk ID" },
    { value: tracking_device_id, name: "Tracking device ID" },
    { value: police_station_id, name: "Police station ID" },
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

  if (source !== undefined && !allowedSources.includes(source.trim().toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: "Source query parameter must be one of: gps, simulated, manual.",
    });
  }

  if (from !== undefined) {
    const fromDate = new Date(from);
    if (Number.isNaN(fromDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "From date must be a valid date-time.",
      });
    }
  }

  if (to !== undefined) {
    const toDate = new Date(to);
    if (Number.isNaN(toDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "To date must be a valid date-time.",
      });
    }
  }

  next();
};

const validateCreateLocationLog = (req, res, next) => {
  const {
    tuk_tuk_id,
    tracking_device_id,
    police_station_id,
    latitude,
    longitude,
    speed,
    heading,
    recorded_at,
    source,
  } = req.body;

  const numericChecks = [
    { value: tuk_tuk_id, name: "Tuk-tuk ID" },
    { value: tracking_device_id, name: "Tracking device ID" },
    { value: police_station_id, name: "Police station ID" },
  ];

  for (const check of numericChecks) {
    if (!Number.isInteger(Number(check.value)) || Number(check.value) <= 0) {
      return res.status(400).json({
        success: false,
        message: `${check.name} is required and must be a positive integer.`,
      });
    }
  }

  if (latitude === undefined || latitude === null || Number.isNaN(Number(latitude))) {
    return res.status(400).json({
      success: false,
      message: "Latitude is required and must be a valid number.",
    });
  }

  if (longitude === undefined || longitude === null || Number.isNaN(Number(longitude))) {
    return res.status(400).json({
      success: false,
      message: "Longitude is required and must be a valid number.",
    });
  }

  if (Number(latitude) < -90 || Number(latitude) > 90) {
    return res.status(400).json({
      success: false,
      message: "Latitude must be between -90 and 90.",
    });
  }

  if (Number(longitude) < -180 || Number(longitude) > 180) {
    return res.status(400).json({
      success: false,
      message: "Longitude must be between -180 and 180.",
    });
  }

  if (speed !== undefined && speed !== null && Number.isNaN(Number(speed))) {
    return res.status(400).json({
      success: false,
      message: "Speed must be a valid number.",
    });
  }

  if (heading !== undefined && heading !== null && Number.isNaN(Number(heading))) {
    return res.status(400).json({
      success: false,
      message: "Heading must be a valid number.",
    });
  }

  if (!recorded_at) {
    return res.status(400).json({
      success: false,
      message: "Recorded time is required.",
    });
  }

  const recordedDate = new Date(recorded_at);
  if (Number.isNaN(recordedDate.getTime())) {
    return res.status(400).json({
      success: false,
      message: "Recorded time must be a valid date-time.",
    });
  }

  if (source !== undefined) {
    if (typeof source !== "string" || !allowedSources.includes(source.trim().toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Source must be one of: gps, simulated, manual.",
      });
    }
  }

  req.body.tuk_tuk_id = Number(tuk_tuk_id);
  req.body.tracking_device_id = Number(tracking_device_id);
  req.body.police_station_id = Number(police_station_id);
  req.body.latitude = Number(latitude);
  req.body.longitude = Number(longitude);
  req.body.speed = speed !== undefined && speed !== null ? Number(speed) : null;
  req.body.heading = heading !== undefined && heading !== null ? Number(heading) : null;
  req.body.recorded_at = recordedDate;
  req.body.source = source ? source.trim().toLowerCase() : "gps";

  next();
};

export {
  validateLocationLogId,
  validateLocationLogQuery,
  validateCreateLocationLog,
};