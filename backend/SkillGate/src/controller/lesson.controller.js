const CourseModel = require("../model/course.model");
const UserModel = require("../model/user.model");
const LessonModel = require("../model/lesson.model");


const createLesson = async (req, res) => {
  try {
    const {courseId} = req.params;
    const course = await CourseModel.findById(courseId);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    console.log(req.body)
    if (!req.body.title || !req.body.summary) {
        return res.status(400).json({ message: "Title and summary are required" }); 
    }
    const lessonData = await LessonModel.create({
      ...req.body,
      createdBy: req.userId,
    });
    course.lessons.push(lessonData._id);
    await course.save();
    res.status(201).json({ message: "Lesson created successfully", lessonData });
  } catch (error) { 
    res.status(500).json({ message: "Internal Server Error",error });
    console.log(error);
  }
}


const getAllLessons = async (req, res) => {
  try {
    let lessons = await CourseModel.findById(req.params.courseId).populate("lessons");
    if (!lessons) {
      return res.status(404).json({ message: "No lessons found for this course" });
    }else {
      res.status(200).json({ message: "All lessons fetched successfully", lessons });
    }
  }catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
}



const updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id) {
      return res.status(400).json({ message: "Lesson ID is required" });
    }
    console.log(req.body);
    const updatedLesson = await LessonModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedLesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.status(200).json({ message: "Lesson updated successfully", updatedLesson });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error",error });
    console.log(error);
  }
}
    

const deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;
    if(!id) {
      return res.status(400).json({ message: "Lesson ID is required" });
    }
    const course = await LessonModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (error) { 
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
}


module.exports = {
  createLesson,
    getAllLessons,
    updateLesson,
    deleteLesson
};