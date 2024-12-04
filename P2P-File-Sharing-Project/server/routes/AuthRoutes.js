const express = require("express");
const router = express.Router();

const {Signup,Login,userValidation} = require("../controllers/Auth");

router.post("/signup", Signup);

router.post("/login",Login);

router.post("/user-validation",userValidation)

module.exports = router;
