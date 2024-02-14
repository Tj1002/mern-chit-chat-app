import Message from "../models/message.model.js";
import { Conversation } from "../models/conversation.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getReceiverSocketId, io } from "../app.js";

const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });
  console.log(conversation);
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = await Message.create({
    senderId,
    receiverId,
    message,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }
  // await conversation.save();
  // await newMessage.save();

  await Promise.all([conversation.save(), newMessage.save()]);
  console.log(conversation);
  // SOCKET IO FUNCTIONALITY WILL GO HERE
  const receiverSocketId = getReceiverSocketId(receiverId);

  if (receiverSocketId) {
    // io.to(<socket_id>).emit() used to send events to specific client
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  res.status(201).json(newMessage);
});

const getMessages = asyncHandler(async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { sendMessage, getMessages };
