const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // req.user should be set by auth.middleware.js
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized. Please login first.",
        });
      }

      // check role
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden. You do not have permission.",
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default authorizeRoles;