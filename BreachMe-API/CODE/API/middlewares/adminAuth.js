const ADMIN = (req, res, next) => {
    if (req.user && req.user.is_admin) {
      next();
    } else {
      return res.status(401).json("Not Authorized as Admin")
    }
  };

  module.exports = ADMIN