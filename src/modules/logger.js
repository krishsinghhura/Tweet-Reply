const Logger = {
  debugMode: true,

  log: function (...args) {
    if (this.debugMode) {
      console.log(...args);
    }
  },

  error: function (...args) {
    console.error("error:", ...args);
  }
};

window.ReplyAssistantLogger = Logger;
