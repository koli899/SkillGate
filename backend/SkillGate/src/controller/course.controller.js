const CourseModel = require("../model/course.model");
const UserModel = require("../model/user.model");

const createCourse = async (req, res) => {
  try {
    const courseData = await CourseModel.create({
      ...req.body,
      createdBy: req.userId,
    });
    const user = await UserModel.findById(req.userId);
    user.courseEnrollment.push(courseData._id);
    await user.save();
    res
      .status(201)
      .json({ message: "Course created successfully", courseData });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await CourseModel.find().populate("createdBy");
    res
      .status(200)
      .json({ message: "All courses fetched successfully", courses });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

const enrollCourse = async (req, res) => {
  try {
    let courseId = req.params.id;
    let userId = req.userId;
    let course = await CourseModel.findById(courseId);
    let user = await UserModel.findById(userId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.courseEnrollment.includes(courseId)) {
      return res
        .status(400)
        .json({ message: "You are already enrolled in this course" });
    }
    user.courseEnrollment.push(courseId);
    await user.save();

    course.enrollment.push(userId);
    await course.save();
    res.status(200).json({ message: "Course enrolled successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

const yourCourses = async (req, res) => {
  try {
    let courses;

    if (req.role === "admin") {
      courses = await CourseModel.find();
    } else {
      const user = await UserModel.findById(req.userId).populate(
        "courseEnrollment"
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      courses = user.courseEnrollment;
    }

    res.status(200).json({
      message: "Your courses fetched successfully",
      courses,
    });
  } catch (error) {
    console.error("Error in yourCourses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const courseData = req.body;

    if (!courseId || !courseData) {
      return res
        .status(400)
        .json({ message: "Course ID and data are required" });
    }

    const courseExists = await CourseModel.findById(courseId);

    if (!courseExists) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!courseExists.createdBy.equals(req.userId) && req.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const course = await CourseModel.findByIdAndUpdate(courseId, courseData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const courseExists = await CourseModel.findById(courseId);

    if (!courseExists) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Allow only the creator or an admin to delete
    if (!courseExists.createdBy.equals(req.userId) && req.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const course = await CourseModel.findByIdAndDelete(courseId);

    res.status(200).json({ message: "Course deleted successfully", course });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  enrollCourse,
  yourCourses,
  updateCourse,
  deleteCourse,
};
