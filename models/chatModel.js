import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, "_id is required for chat"],
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Participant ID is required"],
    },
  ],
  messages: [
    {
      text: {
        type: String,
        required: [true, "Message text is required"],
        minlength: [1, "Message cannot be empty"],
        maxlength: [1000, "Message must be less than 1000 characters"],
      },
      time: {
        type: Date,
        default: Date.now,
      },
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Sender ID is required"],
      },
      sendStatus: {
        type: String,
        enum: {
          values: ["delivered", "seen", "sent"],
          message: "Send status must be either 'delivered', 'seen', or 'sent'",
        },
        required: [true, "Send status is required"],
      },
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
