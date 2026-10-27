const jwt = require("jsonwebtoken");
const BusinessError=require("../errors/BusinessError");

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(new BusinessError("Debe enviar un token."));
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
         next(new BusinessError("Token inválido."));
    }
};

module.exports = authenticate;
