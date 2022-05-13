var io = require("socket.io-client");

socket = io.connect("http://localhost:3001");

socket.on("connect", () => socket.emit("hello", `Hi there! I am a client`));

socket.on("notification", (data) => console.log(`This is data ${data}`));
