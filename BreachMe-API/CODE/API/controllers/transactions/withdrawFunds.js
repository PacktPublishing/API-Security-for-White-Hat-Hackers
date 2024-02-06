const prisma = require("../../DB/prisma");

const withdrawFunds = async(req, res)=>{
const {amount} = req.body
   try {
    if(!amount){
        return res.status(400).json("amount is required")
    }

    const userTransactions = await prisma.transactions.findMany({
        where:{
            user_id:parseInt(req.account.id)
        }
    })
   const incomes = await userTransactions.filter((tranx)=>tranx.type === "income")
   const withdrawals = await userTransactions.filter((tranx)=>tranx.type === "withdrawal")

   const totalIncome = incomes.reduce((acc, tranx)=> acc + parseInt(tranx.amount), 0)
   const totalwithdrawn = withdrawals.reduce((acc, tranx)=> acc + parseInt(tranx.amount), 0)
   const balance = totalIncome - totalwithdrawn

   if(balance < amount){
    return res.status(400).json("Available balance is less than requested amount")
   }
   const newTransaction = await prisma.transactions.create({
    data:{
        amount:String(amount),
        type:"withdrawal",
        user_id:req.account.id,
    },
    select:{
        id:true,
        amount:true,
        type:true
    }
})

res.status(400).json({message:"Withdrawal processed successfully", data:newTransaction})
   } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
   }
}

module.exports = withdrawFunds