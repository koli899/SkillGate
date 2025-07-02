const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    age:{type:Number,min:18},
    role:{type:String,enum:['user','admin','instructor'],default:'user'},
    isVerified:{type:Boolean,default:false},
    courseEnrollment:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
})

const UserModel = mongoose.model('User',userSchema);

module.exports = UserModel;
