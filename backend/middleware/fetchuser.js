const jwt = require("jsonwebtoken");
const blacklist = require("../utils/tokenBlacklist"); // Import blacklist utility
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret"; // Use environment variable or fallback

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(401)
      .send({ error: "Token missing: Please authenticate using a valid token" });
  }

  // Check if the token is blacklisted
  if (blacklist.has(token)) {
    return res
      .status(401)
      .send({ error: "Token invalidated: Please login again" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).send({ error: "Token expired: Please login again" });
    } else if (error.name === "JsonWebTokenError") {
      res.status(401).send({ error: "Invalid token: Please authenticate using a valid token" });
    } else {
      res.status(401).send({ error: "Token validation failed: Please authenticate using a valid token" });
    }
  }
};

module.exports = fetchuser;

