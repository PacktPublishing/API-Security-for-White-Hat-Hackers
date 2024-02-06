const prisma = require("../../DB/prisma");
const { v4: uuidv4 } = require("uuid");
const CryptoJS = require("crypto-js");

const generateApiKey = async(req, res)=>{
    const user_id = req.user.id
   try {
 const apikey = uuidv4()
const hashedKey = CryptoJS.HmacSHA1(apikey, process.env.JWTSECRET).toString()

 const existingKey = await prisma.apikeys.findFirst({
    where: {
        user_id:user_id
    }
 })

 if(existingKey){
    //update it
    await prisma.apikeys.update({
        where:{
            id:existingKey.id
        },
        data:{
           apikey:hashedKey
        }
    })
 }else {
    //create new
    await prisma.apikeys.create({
        data:{
            users:{
                connect:{
                    id:user_id
                }
            },
            apikey:hashedKey
        }
    })
 }
 
 res.status(201).json({message:"key generated successfully", apiKey:hashedKey})
   } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
   }
}

module.exports = generateApiKey