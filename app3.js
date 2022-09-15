const express = require("express");
const app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



io.on("connection", function (socket) {
  socket.on("enter", (nickname) => {
    io.emit("enter", nickname);
  });

//   io.emit("notice", socket.id);

  socket.on("sendMsg", (data) => {
    io.emit("send", data);
  });

  socket.on("disconnect", () => {
    io.emit("out", socket.id);
    // console.log(socket.id);
  });
});

app.get("/", (req, res) => {
  res.render("chat3");
});

// app.get("/chat", (req, res) => {
//   res.render("chat3");
// });

http.listen(8000, () => {
  console.log("Server open : ", 8000);
});
