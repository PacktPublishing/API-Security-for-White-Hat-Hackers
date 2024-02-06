const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const prisma = require("../DB/prisma");

const Auth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWTSECRET);
      // console.log(decoded.email);

      req.user = await prisma.users.findUnique({
        where:{
            email:decoded.email
        }
      });

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401).json("Not authorized, no token");
    // throw new Error("Not authorized, no token");
  }
});

module.exports = Auth