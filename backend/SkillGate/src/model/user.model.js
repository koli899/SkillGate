const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, min: 18 },
  role: { type: String, enum: ['student', 'admin', 'instructor'], default: 'student' },
  isVerified: { type: Boolean, default: false },
  courseEnrollment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

// Pre-save hook to set isVerified = true if role is admin
userSchema.pre('save', function (next) {
  if (this.role === 'admin') {
    this.isVerified = true;
  }
  next();
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
