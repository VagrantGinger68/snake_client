let connection;

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
  if (key === '\u0003') {
    process.exit();
  }
  if (key === 'w' || key === "\u001b[A") {
    connection.write("Move: up");
  }
  if (key === 'a' || key === "\u001b[D") {
    connection.write("Move: left");
  }
  if (key === 's' || key === "\u001b[B") {
    connection.write("Move: down");
  }
  if (key === 'd' || key === "\u001b[C") {
    connection.write("Move: right");
  }
};

module.exports = { setupInput };