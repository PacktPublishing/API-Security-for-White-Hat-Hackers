const express = require("express");
const {
  register,
  login,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/users");
const { Auth, ADMIN } = require("../middlewares");
const { generateApiKey } = require("../controllers/transactions");
const router = express.Router();

router.get("/all", Auth, ADMIN, getAllUsers)
router.post("/register", register);
router.post("/login", login);
router.put("/update/:id", Auth, updateUser);
router.delete("/delete/:id", Auth, ADMIN, deleteUser);
router.post("/generate-key",Auth, generateApiKey)

module.exports = router;
