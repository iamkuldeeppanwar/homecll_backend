const express = require("express");
const router = new express.Router();
const User = require("../model/user");
const sendForgetPasswordEmail = require("../email/account");

//Creating user
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      message: "Unable to SignUP!",
      error: err.message,
    });
  }
});

//Login user
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (err) {
    res.status(404).json({
      message: "Unable to login!",
      error: err,
    });
  }
});

router.post("/users/fpassword", async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    sendForgetPasswordEmail(user.email);
    res.send(user);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post("/users/Rpassword", async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    user.password = req.body.password;
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users/me", async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      throw new Error("Users not found!");
    }
    res.json(users);
  } catch (e) {
    res.status(404).json(e);
  }
});

module.exports = router;
