const express = require("express");
const router = new express.Router();
const User = require("../model/user");

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
  } catch (e) {
    res.status(404).json({
      message: "Unable to login!",
      error: err.message,
    });
  }
});

//Get All users
// router.get("/getUsers", async function (req, res) {
//   await res.json(userData);
//   console.log(userData);
// });

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
