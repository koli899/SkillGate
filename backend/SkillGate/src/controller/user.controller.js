const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const UserModel = require("../model/user.model");
const saltRounds = 10;

const register = async (req, res) => {
  console.log(req.body);
  try {
    const { password } = req.body;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res.status(500).json({ error: "Error generating hash" });
        }
        if (hash) {
          const user = await UserModel.create({ ...req.body, password: hash });
          return res
            .status(201)
            .json({ message: "User registered successfully", user });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return res.status(500).json({ error: "Something went wrong" });
        } else {
          if (result) {
            var token = jwt.sign(
              { userId: user._id, role: user.role },
              process.env.SECRET_KEY
            );
            return res.status(200).json(
              { message: "Login successful",user:{
                role : user.role,
                name: user.name,
                email:user.email,
                age:user.age,
                isVerified:user.isVerified 
              }, token });
          } else {
            return res.status(401).json({ error: "Invalid credentials" });
          }
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};


const updateProfile =async(req,res)=>{
try {
  let userId = req.userId;
  let user = await UserModel.findByIdAndUpdate(userId,req.body,{new:true});
  res.status(200).json({ message: "Profile updated successfully", user });

} catch (error) {
   res.status(500).json({ error: "Internal Server Error",error });
    console.log(error);
}
}


const getProfile = async (req, res) => {
  try {
      let userId = req.userId;
  let user = await UserModel.findById(userId);
  res.status(200).json({ message: "Profile updated successfully", user });
    
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
    
  }
}

const getAllUsers = async(req,res)=>{
    try {
        const users = await UserModel.find();
        res.status(200).json({ message: "All users fetched successfully", users });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error",error });
        console.log(error);
    }
};

const VerifyUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    if (!user) {
        res.status(401).json({ message: "User not found" });
    } else {
        user.isVerified = true;
        await user.save();
        res.status(200).json({ message: "User verified successfully", user });
        }
    } catch (error) {   
        res.status(500).json({ message: "Internal Server Error",error });
        console.log(error);
    }    
  }

  const deleteUser = async (req, res) => {
    try {
      await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete user' });
    }
  }            

module.exports = { register, login,updateProfile,getProfile, getAllUsers , VerifyUser, deleteUser };
