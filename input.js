const { UP, DOWN, LEFT, RIGHT, HELLO, GG } = require("./constants");

let connection;
let clear;

const setupInput = function(conn) {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();
  stdin.on("data", handleUserInput);
  return stdin;
};


const handleUserInput = function(key) {
  const repeat = function(key) {
    clear = setInterval(() => {
      connection.write(key);
    }, 100);
  };

  if (key === '\u0003') {
    process.exit();
  }
  if (key === 'w' || key === "\u001b[A") {
    clearInterval(clear);
    repeat(UP);
  }
  if (key === 'a' || key === "\u001b[D") {
    clearInterval(clear);
    repeat(LEFT);
  }
  if (key === 's' || key === "\u001b[B") {
    clearInterval(clear);
    repeat(DOWN);
  }
  if (key === 'd' || key === "\u001b[C") {
    clearInterval(clear);
    repeat(RIGHT);
  }
  if (key === 'g') {
    connection.write(GG);
  }
  if (key === 'h') {
    connection.write(HELLO);
  }
};

module.exports = { setupInput };