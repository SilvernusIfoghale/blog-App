import express from "express";
import bcrypt from "bcrypt";
import { User } from "../model/userModel.js";
const userRouter = express.Router();

// Create user
userRouter.post("/register", async (req, res) => {
  const { username, email, password, profilePic } = req.body;
  const userAlreadyExist = await User.findOne({ email });
  if (userAlreadyExist) {
    res.status(409).send({ message: `User with ${email} already exist` });
  } else {
    const newUser = new User({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      profilePic,
    });
    const user = await newUser.save();
    res.status(201).send(user);
  }
});

// get user by Id
userRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// get all user
userRouter.get("/every-user/all-user", async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(200).json(allUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Login
userRouter.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with this Email "${email}" not found.` });
    }
    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password." });
    }
    // If both email and password are correct, return user
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal server error." });
  }
});

//Delete user by Id
userRouter.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted successfully");
  } catch (err) {
    return res.status(500).json(err);
  }
});

export { userRouter };
