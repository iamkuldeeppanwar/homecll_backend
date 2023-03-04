const express = require("express");
const router = new express.Router();
const User = require("../model/user");
const sendForgetPasswordEmail = require("../email/account");
const auth = require("../middleware/auth");

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
router.post("/login", async (req, res) => {
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
      error: err.message,
    });
  }
});

router.post("/fpassword", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    sendForgetPasswordEmail(user.email);
    res.send(user);
  } catch (err) {
    res.status(404).json({
      message: "Unable to Forget Password!",
      error: err.message,
    });
  }
});

router.post("/Rpassword", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    const user = await User.findOne({ firstName, lastName, email });
    user.password = req.body.password;
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).json({
      message: "Unable to Reset Password!",
      error: err.message,
    });
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.json({
      success: true,
      user: req.user,
    });
  } catch (e) {
    res.status(500).json({
      message: "Unable to Logout!",
      error: err.message,
    });
  }
});

router.get("/users/me/:id", async (req, res) => {
  try {
    const users = await User.findById(req.params);

    if (!users) {
      throw new Error("Users not found!");
    }
    res.json(users);
  } catch (err) {
    res.status(404).json({
      message: "Unable to Find User!",
      error: err.message,
    });
  }
});

module.exports = router;
