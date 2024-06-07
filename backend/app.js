const express = require("express");
const User = require("./models/user.js");
const Chatroom = require("./models/chatroom.js");
const UserChatroom = require("./models/userchatroom.js");
const Message = require("./models/message.js");
const sequelize = require("./utils/database.js");
const userRouter = require("./routes/user.js");
const roomRouter = require("./routes/room.js");
const messageRouter = require("./routes/message.js");

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/chatrooms", roomRouter);
app.use("/api/v1/message", messageRouter);

Chatroom.belongsTo(User, {
  as: "creator",
  foreignKey: "creatorId",
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(Chatroom, { foreignKey: "creatorId" });
User.belongsToMany(Chatroom, { through: UserChatroom });
Chatroom.belongsToMany(User, { through: UserChatroom });
UserChatroom.hasMany(Message, { onDelete: "CASCADE" });
Message.belongsTo(UserChatroom);
// Additional associations for creator and chatrooms

(async () => {
  const data = await sequelize.sync();
})();

module.exports = app;
