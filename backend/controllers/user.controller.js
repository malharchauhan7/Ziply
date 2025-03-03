import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

async function HandleSignUp(req, res) {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User Already Exists, Try with new Email",
      });
    }

    const userModel = new User({ name, email, password });

    userModel.password = await bcrypt.hash(password, 10);

    await userModel.save();

    res.status(201).json({ success: true, message: "Signup Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Signup Successfully" });
  }
}

async function HandleLogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "No User Found! Try to Signup",
      });
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
      return res.status(403).json({
        success: false,
        message: "Email or password are wrong",
      });
    }

    const jwt_token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.SECRET_KEY
    );

    res.status(201).json({
      success: true,
      message: "Login Successfully",
      jwt_token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("error in login", error);
    req
      .status(500)
      .json({ success: false, message: "Something Wrong in Login" });
  }
}

export { HandleLogin, HandleSignUp };
