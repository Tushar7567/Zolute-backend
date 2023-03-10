const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config('./.env');

const verifyToken = (req, res, next) => {
  token = req.headers.authorization.replace("Bearer ", "");
  const authHeader = token;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader;
    // console.log(token);
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {res.status(403).json("Token is not valid!");}
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user);
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
