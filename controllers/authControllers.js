const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

const signUp = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hassedPass = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hassedPass,
    });
    req.session.user = newUser;
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });

    const isCorrect = bcrypt.compare(user.password, password);

    if (isCorrect) {
      req.session.user = user;
      res.status(200).json({
        status: "success",
      });
    } else
      res.status(400).json({
        status: "fail",
        message: "incorrect user or password",
      });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

module.exports = {
  signUp,
  login,
};
