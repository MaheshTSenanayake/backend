const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;

verifyRoleAccess = (requiredRole) => {
  return (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }

    const decoded = jwt.decode(token, config.secret);
    if (!requiredRole || !requiredRole?.length) {
      next();
      return;
    }
    if (!decoded.role) {
      return res.status(401).send({ message: "Unauthorized access!" });
    }

    let hasRole = false;
    if (Array.isArray(requiredRole)) {
      if (!requiredRole.includes(decoded.role)) {
        return res.status(401).send({
          message: "Unauthorized access!",
        });
      }
    }
    if (decoded.role !== requiredRole) {
      return res.status(401).send({
        message: "Unauthorized access!",
      });
    }

    next();
  };
};

const authJwt = {
  verifyRoleAccess,
};
module.exports = authJwt;
