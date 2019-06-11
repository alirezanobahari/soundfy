import { TELEGRAM_BOT_TOKEN } from "./src/common/keys";
import TelegramApi from "telegram-bot-api";
import BotInterface from "./src/bot/bot-interface";
import CommandProcessor from "./src/bot/command/command-processor";
import { START, DOWNLOAD } from "./src/bot/command/command-regex";
import { startCmd, downloadCmd, defaultCmd } from "./src/bot/command/commands";
//import dbClient from "./src/db/app-db";

// Provide Telegram bot api
export const botApi = new TelegramApi({
  token: TELEGRAM_BOT_TOKEN,
  updates: {
    enabled: true
  }
});

// Provide Telegram bot interface
export const botInterface = new BotInterface(botApi);

// Provide MongoDb client
//export const dbClient = dbClient;

// Provide bot command processor
export const commandProcessor = new CommandProcessor(botInterface)
  .addCommand({
    cmreg: START,
    command: startCmd
  })
  .addCommand({ cmreg: DOWNLOAD, command: downloadCmd })
  // DefaultCmd should be the last parameter
  .addCommand({
    cmreg: "",
    command: defaultCmd
  });
