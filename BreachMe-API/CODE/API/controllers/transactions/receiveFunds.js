const prisma = require("../../DB/prisma");

const receiveFunds = async(req, res)=>{
   const {amount, apikey} = req.query
   try {

    if(!amount || !apikey){
        return res.status(400).json("amount and key required")
    }
   
    const {users} = await prisma.apikeys.findFirst({
        where:{
            apikey:apikey
        },
        include:{
            users:true
        }
      })

    const newTransaction = await prisma.transactions.create({
        data:{
            amount:String(amount),
            type:"income",
            user_id:users.id,
        },
        select:{
            id:true,
            amount:true,
            type:true
        }
    })

    res.status(400).json({message:"Your payment has been received successfully", data:newTransaction})
   } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
   }
}

module.exports = receiveFunds