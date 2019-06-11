import { searchMusic, downloadMusic } from "../../controller/musics.controller";

export const startCmd = (telegramMessage, botInterface) => {
  botInterface.sendText(
    telegramMessage.chat.id,
    "سلام!!! لطفاٌ نام آهنگ درخواستی خود را وارد کنید"
  );
};

export const downloadCmd = (telegramMessage, botInterface) =>
  downloadMusic(telegramMessage, botInterface);

export const defaultCmd = async (telegramMessage, botInterface) =>
  searchMusic(telegramMessage, botInterface);
