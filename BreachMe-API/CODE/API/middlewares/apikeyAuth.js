const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const prisma = require("../DB/prisma");

const VerifyKey = asyncHandler(async (req, res, next) => {
  let key;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      key = req.headers.authorization.split(" ")[1];
     
      const {users} = await prisma.apikeys.findFirst({
        where:{
            apikey:key
        },
        include:{
            users:true
        }
      })
     req.account = users
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json("Bad credentials!!, apiKey failed");
    }
  }

  if (!key) {
    res.status(401).json("Missing credentials!!, no apiKey");
    // throw new Error("Not authorized, no token");
  }
});

module.exports = VerifyKey