var jwt = require("jsonwebtoken");


function verifyRoleAccess(...requiredRole) {
  return async (req, res, next) => {
    try {
      let token = await req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "token not found" });
      }
      var decoded = await jwt.verify(token, process.env.SECRET_KEY);
      if (!decoded) {
        return res.status(401).json({ message: "token expired" });
      }
      if (!requiredRole.includes(decoded.role)) {
        return res
          .status(403)
          .json({ message: "You are not authorized to access this resource" });
      } else {
        req.userId = decoded.userId;
        req.role = decoded.role;
        req.verified = decoded.verified;
        req.email = decoded.email;
        next();
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  };
};

module.exports = verifyRoleAccess;