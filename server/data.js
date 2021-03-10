const casual = require('casual');

const messages = {
  info: 'Some Info Message',
  warning: 'some warning Message',
  error: ' some error message',
};

const messageData = new Array(90).fill(null).map((_, i) => {
  const Fn = function () {
    this.id = i;
    this.date = casual.date('YYYY-MM-DD');
    this.severity = casual.random_element(['warning', 'info', 'error']);
    this.message = messages[this.severity];
    return this;
  };
  const foo = new Fn();
  return foo;
});

// const toJson = JSON.stringify(messageData)

module.exports = messageData;
