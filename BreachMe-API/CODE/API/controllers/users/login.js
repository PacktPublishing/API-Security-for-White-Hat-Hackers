const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../../DB/prisma");
const missingRequiredParams = require("../../utilities/validateRequiredInputs");

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const missingField = missingRequiredParams(
        ["username", "password",],
        req.body
      );
      if (missingField) {
        return res.status(400).json(` ${missingField} is required`);
      }

    //find user
    const existingUser = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    if (!existingUser) {
      return res.status(400).json(`user with username: ${username} not found`);
    }

    //validate password
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(400).json("wrong password");
    }
    existingUser.password = "#############";
    const token = jwt.sign(existingUser, process.env.JWTSECRET, {
      expiresIn: "3d",
    });
    // console.log(token);
   

    res
      .status(200)
      .json({ message: "log in successfull", user: existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

module.exports = login;