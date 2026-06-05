import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/portfolio";

app.use(cors());
app.use(express.json());

let Message;
try {
  const messageSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      subject: { type: String, default: "" },
      message: { type: String, required: true },
    },
    { timestamps: true }
  );
  Message = mongoose.model("Message", messageSchema);
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected");
} catch {
  console.log("MongoDB not available, using in-memory storage");
}

const inMemoryMessages = [];

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    if (Message) {
      await Message.create({ name, email, subject, message });
    } else {
      inMemoryMessages.push({ name, email, subject, message, createdAt: new Date() });
    }
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ error: "Failed to send message. Please try again." });
  }
});

app.get("/api/health", (_, res) => {
  res.json({ status: "ok", storage: Message ? "mongodb" : "in-memory" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
