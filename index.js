import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";
import TelegramBot from "node-telegram-bot-api";
config();

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const ai = new GoogleGenAI({});


const generateReply = async (text) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: text,
    config: {
      systemInstruction: "You are a telegram bot. Your name is nova.",
    },
  });
  return response.text;
};

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text) return;

  try {
    const reply = await generateReply(text);

    bot.sendMessage(chatId, reply);


  } catch (error) {
    bot.sendMessage(
      chatId,
      "Sorry, an error occurred while processing your request."
    );
    console.error("Error processing message:", error.message || error);
    return;
  }

});


console.log("Telegram bot is running...");
