const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const userList = require("../model/userList");

//Creating user
router.post("/users/list", auth, async (req, res) => {
  const user = new userList({
    ...req.body,
    owner: req.user.name,
    user: req.user._id,
    name: req.body.name,
  });
  try {
    await user.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
});

//Get All users
router.get("/users/list", async (req, res) => {
  try {
    const user = await userList.find();

    if (!user) {
      throw new Error("User not found!");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (e) {
    res.status(404).json({
      success: false,
      error: e,
    });
  }
});

module.exports = router;
