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
  message_thread_id: 22, //test2
};
const getResult = () => {
  const result = resultGame.map((elem) => `${elem.name} ${elem.point}\n`);
  return result;
};

const changeResult = (text = "Kesha 50") => {
  text = "qqq 10";
  let textArray = text.toLowerCase().split(" "); // [kolya, 235]
  //
  let nameList = [];
  resultGame.map((elem) => nameList.push(elem.name));
  //
  if (nameList.includes(textArray[0])) {
    resultGame
      .filter((elem) => elem.name === textArray[0])
      .map((elem) => (elem.point += Number(textArray[1])));
  } else {
    resultGame.push({ name: textArray[0], point: Number(textArray[1]) });
  }
};
bot.on("text", async (msg) => {
  try {
    if (msg.reply_to_message.forum_topic_created.name === "test2") {
      // if (msg.text.startsWith("/start")) {
      //   const msgWait = await bot.sendMessage(msg.chat.id, `Вы запустили бота!`);

      //   setTimeout(async () => {
      //     await bot.editMessageText("test", {
      //       chat_id: msgWait.chat.id,
      //       message_id: msgWait.message_id,
      //     });
      //   }, 1000);
      // }

      // if (msg.text.startsWith("/result")) {
      //   await bot.sendMessage(msg.chat.id, `${getResult()}`);
      // }
      // if (msg.text.length > 5) {
      //   console.log(msg.text);
      //   resultGame.push({ name: "test", point: "test" });
      //   await bot.sendMessage(msg.chat.id, `${getResult()}`);
      // }

      //   pinChatMessage(
      //     chatId: TelegramBot.ChatId,
      //     messageId: number,
      //     options?: TelegramBot.PinChatMessageOptions,
      // ): Promise<boolean>;
      changeResult(msg.text);
      switch (msg.text) {
        case "/start@leshen_uno_bot":
          await bot.sendMessage(msg.chat.id, "test");
          break;

        default:
          break;
      }
      console.log(msg);
      await bot.sendMessage(msg.chat.id, "test theme", chatThemeId);
      let toPin = await bot.sendMessage(msg.chat.id, `${getResult()}`);
      if (!pinMesId) {
        await bot.unpinAllChatMessages(msg.chat.id);
        pinMesId = toPin.message_id;
        await bot.pinChatMessage(msg.chat.id, pinMesId);
      } else {
        await bot.editMessageText(`${getResult()}`, {
          chat_id: toPin.chat.id,
          message_id: pinMesId,
        });
      }
    }
    // unpinAllChatMessages;
  } catch (error) {
    console.log(error);
  }
});
