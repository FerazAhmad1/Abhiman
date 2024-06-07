const UserChatRoom = require("../models/userchatroom.js");

exports.saveMessage = async (req, res) => {
  try {
    const { roomId = null, content = null } = req.body;
    const senderRoom = await UserChatRoom.findOne({
      where: { chatroomId: roomId, userId: req.user.dataValues.id },
    });

    const message = await senderRoom.createMessage({
      content,
      senderId: req.user.dataValues.id,
    });
    console.log("555555555555555555555555555555", message);
  } catch (error) {
    console.log("666666666666666666666666", error.message);
  }
};

exports.recieveAllMessge = async (req, res) => {
  try {
    console.log(req.params);
    const { userChatroomId } = req.params;
    const userChatRoom = await UserChatRoom.findOne({
      where: { chatroomId: userChatroomId, userId: req.user.dataValues.id },
    });
    const messageData = await userChatRoom.getMessages();
    const message = messageData.map((meaasges) => meaasges.dataValues);
    res.status(200).json({
      success: true,
      data: {
        message,
      },
    });
    console.log(message);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};
