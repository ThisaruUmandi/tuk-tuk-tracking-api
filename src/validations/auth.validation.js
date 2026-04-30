const validateLogin = (req, res, next) => {
  const { email, password_hash } = req.body;

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

  next();
};

export { validateLogin };