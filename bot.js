import TelegramBot from "node-telegram-bot-api";
import { TOKEN } from "./config.js";
import { COMMAND } from "./command.js";
const bot = new TelegramBot(TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
  },
});
bot.setMyCommands(COMMAND);
let pinMesId = false;
let resultGame = [
  { name: "sasha", point: 100 },
  { name: "arlen", point: 505 },
];
let chatThemeId = {
  message_thread_id: 96, //test2
};
const getResult = () =>
  resultGame.map((elem) => `${elem.name} ${elem.point}\n`);

const changeResult = (text) => {
  text = "qqq 50";
  const textArray = text.toLowerCase().split(" "); // [kolya, 235]
  const nameList = [];
  if (checkMessage(textArray)) {
    console.log(resultGame);
    resultGame.map((elem) => nameList.push(elem.name));
    nameList.includes(textArray[0])
      ? resultGame
          .filter((elem) => elem.name === textArray[0])
          .map((elem) => (elem.point += Number(textArray[1])))
      : resultGame.push({ name: textArray[0], point: Number(textArray[1]) });
  }
};
const checkMessage = (textArray) =>
  isNaN(Number(textArray[1])) ? false : true;

bot.on("text", async (msg) => {
  const chatId = msg.chat.id;
  try {
    if (
      (msg.reply_to_message.forum_topic_created.name === "test2") &
      (msg.text.length > 0) // нужно 6
    ) {
      switch (msg.text) {
        case "/new_game@leshen_uno_bot":
          await bot.unpinAllChatMessages(chatId);
          const toPin = await bot.sendMessage(chatId, `New Game`, chatThemeId);
          pinMesId = toPin.message_id;
          await bot.pinChatMessage(chatId, pinMesId);
          break;
        case "/result@leshen_uno_bot":
          await bot.sendMessage(chatId, `${getResult()}`, chatThemeId);
          break;
        default:
          changeResult(msg.text);
          await bot.editMessageText(`${getResult()}`, {
            chat_id: chatId,
            message_id: pinMesId,
          });
          break;
      }
    }

    // unpinAllChatMessages;
  } catch (error) {
    // console.log(error);
  }
});
