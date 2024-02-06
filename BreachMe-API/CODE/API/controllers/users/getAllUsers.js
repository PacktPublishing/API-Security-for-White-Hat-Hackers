const prisma = require("../../DB/prisma");

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();

    for (const user of users) {
      user.password = "###########";
    }

    res.status(200).json({ message: "users fetched successfull", data: users });
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

module.exports = getAllUsers;
