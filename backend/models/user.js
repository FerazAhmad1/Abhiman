const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../utils/database.js");
const bcrypt = require("bcrypt");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true,
      len: {
        args: [10, 10],
        msg: "Phone number must be exactly 10 digits long",
      },
    },
  },
  availCoins: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  device: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

User.addHook("beforeSave", "hashedpassword", async function (user, option) {
  if (user.changed("password")) {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
  }
  return;
});
module.exports = User;
