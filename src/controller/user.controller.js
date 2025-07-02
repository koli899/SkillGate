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
            return res.status(200).json({ message: "Login successful", token });
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

module.exports = { register, login };
