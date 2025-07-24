const express = require('express');
const verifyRoleAccess = require('../middelware/roleAcess.middelware');
const { createCourse, getAllCourses, enrollCourse, yourCourses, updateCourse, deleteCourse } = require('../controller/course.controller');
const CourseModel = require('../model/course.model');

//const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } = require('../controllers/course.controller');

const CourseRouter = express.Router();


CourseRouter.post('/create', verifyRoleAccess("admin","instructor"),createCourse)

CourseRouter.get('/all',getAllCourses)

CourseRouter.get('/enrollCourse/:id',verifyRoleAccess("student"),enrollCourse )

CourseRouter.get('/yourCourses', verifyRoleAccess("admin","instructor","student"),yourCourses)

CourseRouter.patch('/updateCourse/:id', verifyRoleAccess("admin","instructor"), updateCourse);

CourseRouter.delete('/deleteCourse/:id', verifyRoleAccess("admin","instructor"), deleteCourse);

// CourseRouter.get('/enrollCourse/:id', verifyRoleAccess("admin","instructor","user"), async (req, res) => {
// try {
    
// } catch (error) {
    
// }
// })
   



module.exports = CourseRouter