const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const cookie = require("js-cookie");
async function userSignInContoller(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 * 8,
      });
      const tokenOption = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        domain: "https://art-gallery-one-eta.vercel.app",
        path: "/", // Ensure the cookie is available on all routes
        sameSite: "lax",
      };

      res.cookie("token", token, tokenOption).json({
        message: "Login successfully",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Please check password");
    }
    console.log("checkPassword", checkPassword);
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInContoller;
