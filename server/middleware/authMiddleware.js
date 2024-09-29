const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token == null) {
    console.log("No token provided");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.sendStatus(403);
    }

    req.user = user;
    console.log("Token verified. User:", user);
    next();
  });
};

module.exports = authenticateToken;
