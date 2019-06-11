class BotInterface {
  constructor(botApi) {
    this.botApi = botApi;
  }

  sendText(chatId, message) {
    return this.botApi.sendMessage({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML"
    });
  }

  sendAudio(chatId, caption, fileStream) {
    return this.botApi.sendAudio({
      chat_id: chatId,
      caption: caption,
      audio: fileStream
    });
  }

  sendVideo(chatId, caption, fileStream) {
    return this.botApi.sendVideo({
      chat_id: chatId,
      caption,
      video: fileStream
    });
  }

  forward(chatId, fromChatId, messageId, disableNotification = false) {
    return this.botApi.forwardMessage({
      chat_id: chatId,
      from_chat_id: fromChatId,
      message_id: messageId,
      disable_notification: disableNotification
    });
  }

  editCaption(chatId, messageId, caption, parseMode = "HTML") {
    return this.botApi.editMessageCaption({
      chat_id: chatId,
      message_id: messageId,
      caption: caption,
      parse_mode: parseMode
    });
  }

  deleteMessage(chatId, messageId) {
    return this.botApi.deleteMessage({
      chat_id: chatId,
      message_id: messageId
    });
  }
}

export default BotInterface;
