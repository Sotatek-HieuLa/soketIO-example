var express = require("express");
var bodyParser = require("body-parser");
var server = require("http").Server(app);
var io = require("socket.io")(server);

const SERVER_SOCKET_PORT = 3001;
const SERVER_REST_PORT = 3000;

function onNewWebsocketConnection(socket) {
  console.info(`Socket ${socket.id} has connected.`);

  socket.on("disconnect", () => {
    console.info(`Socket ${socket.id} has disconnected.`);
  });

  socket.on("hello", (helloMsg) =>
    console.info(`Socket ${socket.id} says: "${helloMsg}"`)
  );
}

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

server.listen(SERVER_SOCKET_PORT, () =>
  console.info(`SOCKET listening on port ${SERVER_SOCKET_PORT}.`)
);
app.listen(SERVER_REST_PORT, () => {
  console.info(`REST listening on port ${SERVER_REST_PORT}.`);
});

io.on("connection", onNewWebsocketConnection);

app.post("/push", function (req, res) {
  io.emit("notification", JSON.stringify(req.body, null, 2));
  console.log(JSON.stringify(req.body, null, 2));
  res.send("emited");
});

app.get("/", function (req, res) {
  return res.send("oke");
});