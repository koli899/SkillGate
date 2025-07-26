require('dotenv').config();
const express = require('express');
const cors = require('cors')
const connectToMongoDB = require('./src/config/mongo.config');
const UserRouter = require('./src/routes/user.route');
const CourseRouter = require('./src/routes/course.route');
const Announcementrouter = require('./src/routes/annoucement.route');
const LessonRouter = require('./src/routes/lesson.route');

const app = express();
app.use(express.json());

app.use(cors({
  origin: ["https://skill-gate-alpha.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true
}));



// app.options("*", cors());




app.use("/user",UserRouter)
app.use("/course",CourseRouter)
app.use("/announcement",Announcementrouter );
app.use("/lesson",LessonRouter)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT }`);
    connectToMongoDB()
})