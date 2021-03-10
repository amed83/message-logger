const casual = require("casual");

const messages = {
  info: "Some Info Message",
  warning: "some warning Message",
  error: " some error message",
};

const messageData = new Array(90).fill(null).map((_, i) => {
  const BuildData = function () {
    this.id = i;
    this.date = casual.date("YYYY-MM-DD h:mm:ss");
    this.severity = casual.random_element(["warning", "info", "error"]);
    this.message = messages[this.severity];
    return this;
  };
  const buildData = new BuildData();
  return buildData;
});

module.exports = messageData;
