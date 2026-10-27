const authService = require("../services/auth.service");

exports.login = async (req, res, next) => {
  try {
    const token = await authService.login(req.body);
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.dashboard = (req, res) => {
  res.json({
    message: "Bienvenido al panel",
    userId: req.user.id
  });
};
