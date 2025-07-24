const express = require("express");
const verifyRoleAccess = require("../middelware/roleAcess.middelware");
const LessonModel = require("../model/lesson.model");
const { createLesson, getAllLessons, updateLesson, deleteLesson } = require("../controller/lesson.controller");


const LessonRouter = express.Router();

LessonRouter.post("/create/:courseId", verifyRoleAccess("admin","instructor"), createLesson);
LessonRouter.get("/all/:courseId", verifyRoleAccess("admin", "instructor", "student"), getAllLessons);  
LessonRouter.patch("/update/:id", verifyRoleAccess("admin", "instructor"), updateLesson);
LessonRouter.delete("/delete/:id", verifyRoleAccess("admin", "instructor"), deleteLesson);


module.exports = LessonRouter;