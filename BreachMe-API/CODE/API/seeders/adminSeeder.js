const prisma = require("../DB/prisma")
const bcrypt = require("bcryptjs");

const seedDefaultAdmin = async ()=>{
    const {ADMIN_PASSWORD, ADMIN_EMAIL, ADMIN_USERNAME} = process.env

    try {
        const admins = await prisma.users.findMany({
            where:{
                is_admin:true
            }
        })

        if(admins.length < 1){
            //create an admin
          const hashedPass = await bcrypt.hash(ADMIN_PASSWORD, 10);
          const defaultAdmin = await prisma.users.create({
            data:{
                username: ADMIN_USERNAME,
                password:hashedPass,
                email:ADMIN_EMAIL,
                is_admin:true
            }
          })
          return console.log("new Admin Created", defaultAdmin)
        }
       return console.log("Admin User already exists")
    } catch (error) {
        // console.log(error)
        return console.log("ERROR SEEDING ADMIN", error.message)
    }
}

seedDefaultAdmin()