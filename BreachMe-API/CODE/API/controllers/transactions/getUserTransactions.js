const prisma = require("../../DB/prisma");

const getUserTransactions = async (req, res) => {
  try {
    const allTransactions = await prisma.transactions.findMany({
      where: {
        user_id: parseInt(req.account.id),
      },
    });
    res
      .status(200)
      .json({
        message: "transactions fetched successfully",
        data: allTransactions,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports = getUserTransactions;
