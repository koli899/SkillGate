const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const UserModel = require("../model/user.model");
const { register, login } = require("../controller/user.controller");


const UserRouter = express.Router();

UserRouter.post("/register", register );
UserRouter.get("/login", login);

module.exports = UserRouter;
