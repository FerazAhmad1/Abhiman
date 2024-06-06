const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../utils/database.js");
const UserChatroom = sequelize.define("user_chatroom", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  chatroomId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "chatrooms",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

module.exports = UserChatroom;
