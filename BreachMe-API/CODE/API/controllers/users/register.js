const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../../DB/prisma");
const missingRequiredParams = require("../../utilities/validateRequiredInputs");

const register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const missingField = missingRequiredParams(
      ["email", "username", "password"],
      req.body
    );
    if (missingField) {
      return res.status(400).json(` ${missingField} is required`);
    }
    //validate email

    //check for existing user
    const existingEmail = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (existingEmail) {
      return res.status(400).json(`user with email ${email} already exists`);
    }

    const existingUserName = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUserName) {
      return res
        .status(400)
        .json(`user with username ${username} already exists`);
    }

    //hash the password
    const hashedPass = await bcrypt.hash(password, 10);
    const addedUser = await prisma.users.create({
      data: {
        email: email,
        username: username,
        password: hashedPass,
      },
    });

    addedUser.password = "#############";
    // console.log(addedUser);
    const token = jwt.sign(addedUser, process.env.JWTSECRET, {
      expiresIn: "3d",
    });

    return res
      .status(200)
      .json({ message: "user created successfully", user: addedUser, token });
  } catch (error) {
    console.log(`ERROR REGISTERING USER : ${error.message}`);
    res.status(500).json(error.message);
  }
};

module.exports = register;
