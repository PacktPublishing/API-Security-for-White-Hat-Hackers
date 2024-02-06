const express = require("express")
const router = express.Router()
const userRoutes = require("./user")
const transactionRoutes = require("./transactions")


router.use("/users", userRoutes)
router.use("/transactions", transactionRoutes)


module.exports = router;
