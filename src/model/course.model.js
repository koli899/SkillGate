const mongose = require("mongoose");

const courseSchema = new mongose.Schema({
  course: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  enrollment: [{ type: mongose.Schema.Types.ObjectId, ref: "user" }],
  createdBy: {type: mongose.Schema.Types.ObjectId,ref: "User",required: true,},
  createdAt: { type: Date, default: Date.now },
});

const CourseModel = mongose.model("Course", courseSchema);

module.exports = CourseModel;