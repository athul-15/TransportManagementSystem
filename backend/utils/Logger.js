// Logger.js (Singleton Pattern)
class Logger {
  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }

    this.logs = [];
    Logger.instance = this;
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] ${message}`;
    this.logs.push(formattedMessage);
    console.log(formattedMessage);
  }

  getLogs() {
    return this.logs;
  }
}

const singletonLogger = new Logger();
Object.freeze(singletonLogger); // prevent modification

module.exports = singletonLogger;
