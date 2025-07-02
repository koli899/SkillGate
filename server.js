require('dotenv').config();
const express = require('express');
const connectToMongoDB = require('./src/config/mongo.config');
const UserRouter = require('./src/routes/user.route');
const CourseRouter = require('./src/routes/course.route');

const app = express();
app.use(express.json());

app.use("/user",UserRouter)
app.use("/course",CourseRouter)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT }`);
    connectToMongoDB()
})