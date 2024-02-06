const express = require("express");
const {  receiveFunds, withdrawFunds, getAllTransactions, getUserTransactions } = require("../controllers/transactions");
const VerifyKey = require("../middlewares/apikeyAuth");
const router = express.Router();

router.get("/pay",VerifyKey, receiveFunds)
router.post("/withdraw", VerifyKey, withdrawFunds)
router.get("/user", VerifyKey,getUserTransactions)
router.get("/all", VerifyKey, getAllTransactions)
module.exports = router;
