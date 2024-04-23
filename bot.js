import TelegramBot from "node-telegram-bot-api";
import { TOKEN, chatThemeId, pinId } from "./config.js";
import { COMMAND } from "./command.js";
import { changeResult, getResult, restartGame, updateChart } from "./result.js";
const bot = new TelegramBot(TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
  },
});
bot.setMyCommands(COMMAND);
bot.on("text", async (msg) => {
  const chatId = msg.chat.id; // updateChart();
  try {
    if (
      (msg.reply_to_message.forum_topic_created.name === "test2" ||
        msg.reply_to_message.forum_topic_created.name === "UNO") &
      (msg.text.length > 6)
    ) {
      switch (msg.text) {
        case "/new_game@leshen_uno_bot":
        case "/new_game":
          restartGame();
          await bot.unpinAllChatMessages(chatId);
          const toPin = await bot.sendMessage(chatId, `New Game`, chatThemeId);
          pinId.id = toPin.message_id;
          await bot.pinChatMessage(chatId, pinId.id);
          break;
        case "/result@leshen_uno_bot":
        case "/result":
          await bot.sendMessage(chatId, `${getResult()}`, chatThemeId);
          setTimeout(() => {
            bot.sendPhoto(
              chatId,
              "../leshen_uno_bot/chart/mychart.png",
              chatThemeId
            );
          }, 1000);

          break;
        default:
          changeResult(msg.text);
          await bot.editMessageText(`${getResult()}`, {
            chat_id: chatId,
            message_id: pinId.id,
            parse_mode: "HTML",
            disable_notification: true,
          });
          updateChart();
          await bot.sendMessage(chatId, `${getResult()}`, {
            reply_to_message_id: msg.message_id,
            parse_mode: "HTML",
            disable_notification: true,
          });
          break;
      }
    }
  } catch (error) {
    console.log(error);
  }
});
