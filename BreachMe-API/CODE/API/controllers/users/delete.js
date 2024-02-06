const prisma = require("../../DB/prisma");

const deleteUser = async (req, res) => {
  const user_id = req.params.id

  try {
    //find user
    const existingUser = await prisma.users.findUnique({
      where: {
        id: parseInt(user_id),
      },
    });

    if (!existingUser) {
      return res.status(400).json(`user not found`);
    }

   await prisma.users.delete({
    where:{
        id: existingUser.id,
    },
   })
   
    res
      .status(204)
      .json({ message: "user deleted successfull" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

module.exports = deleteUser;