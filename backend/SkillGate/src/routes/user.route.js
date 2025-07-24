const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const UserModel = require("../model/user.model");
const { register, login, updateProfile ,getProfile, getAllUsers, VerifyUser, deleteUser} = require("../controller/user.controller");
const verifyRoleAccess = require("../middelware/roleAcess.middelware");


const UserRouter = express.Router();

UserRouter.post("/register", register );
UserRouter.post("/login", login);
UserRouter.patch("/updateProfile",verifyRoleAccess("admin","instructor","student"),updateProfile)
UserRouter.get("/getProfile",verifyRoleAccess("admin","instructor","student"),getProfile)
UserRouter.get("/getAllUsers",verifyRoleAccess("admin"),getAllUsers);
UserRouter.patch("/VerifyUser/:id",verifyRoleAccess("admin"),VerifyUser)

UserRouter.delete('/deleteUser/:id',verifyRoleAccess("admin"),deleteUser) 

 


module.exports = UserRouter;
