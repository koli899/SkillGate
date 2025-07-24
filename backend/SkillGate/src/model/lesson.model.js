const mongoose = require("mongoose");
const { create } = require("./announcements.model");



const lessonSchema = new mongoose.Schema({
title: { type: String, required: true },
summary: { type: String, required: true },
course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
createdAt: { type: Date, default: Date.now },
});

const LessonModel = mongoose.model("Lesson", lessonSchema);


module.exports = LessonModel;

