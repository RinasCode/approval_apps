module.exports = function roleMiddleware(requiredRole) {
    return (req, res, next) => {
      if (req.user.roleString !== requiredRole) {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    };
  };
  