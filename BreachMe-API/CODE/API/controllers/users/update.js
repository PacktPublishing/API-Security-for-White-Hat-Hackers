const prisma = require("../../DB/prisma");

const updateUser = async (req, res) => {
  const { email, username } = req.body;
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

   const updatedUser = await prisma.users.update({
    where:{
        id: existingUser.id,
    },
    data:{
        username : username || existingUser.username,
        email:email || existingUser.email
    }
   })
   

    res
      .status(200)
      .json({ message: "user updated successfull", user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

module.exports = updateUser;