const validateUserId = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "User ID must be a positive integer.",
    });
  }

  next();
};

const validateCreateUser = (req, res, next) => {
  const { first_name, last_name, email, password_hash, role } = req.body;

  if (!first_name || typeof first_name !== "string") {
    return res.status(400).json({
      success: false,
      message: "First name is required.",
    });
  }

  if (!last_name || typeof last_name !== "string") {
    return res.status(400).json({
      success: false,
      message: "Last name is required.",
    });
  }

  if (!email || typeof email !== "string") {
    return res.status(400).json({
      success: false,
      message: "Email is required.",
    });
  }

  if (!password_hash || typeof password_hash !== "string") {
    return res.status(400).json({
      success: false,
      message: "password_hash is required.",
    });
  }

  if (!role || !["admin", "police"].includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Role must be 'admin' or 'police'.",
    });
  }

  next();
};

const validateUpdateUser = (req, res, next) => {
  const { first_name, last_name, role, is_active } = req.body;

  if (!first_name || typeof first_name !== "string") {
    return res.status(400).json({
      success: false,
      message: "First name is required.",
    });
  }

  if (!last_name || typeof last_name !== "string") {
    return res.status(400).json({
      success: false,
      message: "Last name is required.",
    });
  }

  if (!role || !["admin", "police"].includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Role must be 'admin' or 'police'.",
    });
  }

  if (typeof is_active !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "is_active must be true or false.",
    });
  }

  next();
};

export {
  validateUserId,
  validateCreateUser,
  validateUpdateUser,
};