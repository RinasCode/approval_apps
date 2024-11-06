const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../models");

dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    console.log("Authorization Header:", authHeader);
    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { idString: decoded.idString } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user; 
    next(); 
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Unauthorized." });
  }
};

module.exports = authMiddleware;
