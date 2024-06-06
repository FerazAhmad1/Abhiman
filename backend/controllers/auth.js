const userModel = require("../models/user.js");
const bcrypt = require("bcrypt");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const signToken = (id, deviceId) => {
  console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG", process.env.JWT_EXPIRES_IN);
  return jwt.sign({ id, deviceId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const {
      userId: id = null,
      deviceId: device = null,
      name = null,
      availCoins = null,
      phone = null,
      password = null,
      role = "user",
    } = req.body;

    const response = await userModel.create({
      id,
      device,
      name,
      availCoins,
      phone,
      password,
      role,
    });
    const newUser = response.dataValues;
    const token = signToken(newUser.id, newUser.device);
    res.status(201).json({
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    console.log(req.body);
    const {
      userId: id = null,
      deviceId: device = null,
      password = null,
    } = req.body;

    if (!id) {
      throw {
        message: "please send userId",
      };
    }
    if (!device) {
      throw {
        message: "please send deviceId",
      };
    }
    if (!password) {
      throw {
        message: "please send password",
      };
    }

    const user = await userModel.findOne({
      where: {
        id,
      },
    });
    console.log("user", user);
    if (!user) {
      throw {
        success: false,
        message: "this email is not registerd with us",
        token: null,
      };
    }
    const correctPassword = await bcrypt.compare(
      password,
      user.dataValues.password
    );
    if (!correctPassword) {
      throw {
        message: "userId or password is wrong",
      };
    }

    const token = signToken(id, device);
    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.protect = async function (req, res, next) {
  // 1)check if token is present in request or not
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      console.log("yyyyyyyyyyyyyyyyyyyyy 75");
      token = req.headers.authorization.split(" ")[1];
      console.log(req.headers.authorization.split(" ")[1]);
    }

    if (!token) {
      throw {
        message: "you are not logged in please login to get access",
        status: 401,
      };
    }

    console.log("hello");
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded, "decoded");

    //  3)  check if user still exist or not

    const response = await userModel.findByPk(decoded.id);
    const currentUser = response.dataValues;
    console.log("currentUser", currentUser);
    if (!currentUser) {
      console.log("user does not exist");
      throw {
        message: "user does not exist",
      };
    }

    req.user = response;

    next();
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error.message,
    });
    return;
  }
};

exports.restrictTo = (...privilage) => {
  return function (req, res, next) {
    try {
      const { role } = req.user.dataValues;
      const permission = privilage.includes(role);
      if (!permission) {
        res.status(401).json({
          success: false,
          message: "you are not autorize to perform this action",
        });

        return;
      }
      console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHH", role);
      next();
    } catch (error) {
      console.log(error.message);
    }
  };
};
