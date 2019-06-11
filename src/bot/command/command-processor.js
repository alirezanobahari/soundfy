class CommandProcessor {
  constructor(botInterface) {
    this.botInterface = botInterface;
    this.commands = [];
  }

  addCommand(command) {
    this.commands.push(command);
    return this;
  }

  process(telegramMessage) {
    for (var i = 0; i < this.commands.length; i++) {
      const command = this.commands[i];
      if (telegramMessage.text.match(command.cmreg)) {
        command.command(telegramMessage, this.botInterface);
        break;
      }
    }
  }
}

export default CommandProcessor;
