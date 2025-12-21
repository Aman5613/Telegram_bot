import { config } from "dotenv";
config();

import TelegramBot from "node-telegram-bot-api";

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
    console.log(msg);
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Hello! I am your Telegram Bot 🤖");
});

// bot.onText(/\/start/, (msg) => {
//   bot.sendMessage(msg.chat.id, "Welcome! Type /help");
// });

// bot.onText(/\/help/, (msg) => {
//   bot.sendMessage(msg.chat.id, "Available commands:\n/start\n/help");
// });

console.log("Telegram bot is running...");