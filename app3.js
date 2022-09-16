const express = require("express");
const app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
app.set("view engine", "ejs");
app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var client_list = {
  // 소켓아이디 : 닉네임,
};

io.on("connection", function (socket) {
  // io.to().emit();

  socket.on("sendMsg", (data) => {
    if (data.dm == "all") {
      io.emit("send", data);
    } else {
      io.to(data.dm).emit("send", data);
      socket.emit("send", data);
    }
  });

  socket.on("enter", (nickname) => {
    if (Object.values(client_list).indexOf(nickname) > -1) {
      socket.emit("err", "중복되는 ID입니다.");
    } else {
      client_list[socket.id] = nickname;
      console.log(Object.values(client_list));
      socket.emit("entrySuccess", "입장성공");
      io.emit("notice", nickname);
      io.emit("userlist", nickname);
      io.emit("clientUpdate", client_list);
    }
  });

  socket.on("disconnect", () => {
    delete client_list[socket.id];
    io.emit("clientUpdate", client_list);
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
