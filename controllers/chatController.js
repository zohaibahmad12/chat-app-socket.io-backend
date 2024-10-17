import Chat from "../models/chatModel.js";
export const getChat = async (req, res) => {
  const { chatId } = req.query;
  if (!chatId) {
    return res.status(400).json({ message: "chatId query parameter is required" });
  }
  try {
    const chat = await Chat.findById(chatId).populate("participants", "name email");

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    return res.status(200).json({ chat });
  } catch (error) {
    return res.status(500).json({ message: "Error finding chat", error: error.message });
  }
};

export const addMessage = async (req, res) => {
  try {
    const { participants, senderId, text, sendStatus } = req.body;
    if (!participants || participants.length !== 2 || !senderId || !text || !sendStatus) {
      return res.status(400).json({ error: "Missing fields in request body" });
    }

    const chatId = participants.sort().join("-");
    let chat = await Chat.findById(chatId);
    if (!chat) {
      chat = new Chat({
        _id: chatId,
        participants,
        messages: [],
      });
    }

    const newMessage = {
      text,
      senderId,
      sendStatus,
      time: Date.now(),
    };

    chat.messages.push(newMessage);
    await chat.save();

    res.status(200).json({
      message: "Message added successfully",
      chat,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding message", error: error.message });
  }
};
