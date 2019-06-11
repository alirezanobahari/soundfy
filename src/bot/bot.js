class Bot {
  constructor(botApi, commandProcessor) {
    // Message listener
    botApi.on("message", message => {
      // Received text message
      try {
        console.log(message);
        commandProcessor.process(message);
      } catch (e) {
        console.log(e);
      }
    });
  }
}

export default Bot;
