const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 8000;
app.set("view engine", "ejs");
app.get("/", function (req, res) {
  res.render("index");
});
var client_list = {};
// { 소켓아이디 : 닉네임, 소켓아이디 : 닉네임, .... }
// client_list = {
//     fklsdjflskdjflksjfa: "김소연",
//     dkfjslfjlsdkfjsdl: "홍길동",
//     dskfjsdlkfjlsdfjsdl: "djfsdkljfs",
// }
io.on("connection", function (socket) {
  // io.emit("notice", socket.id);
  //본인이 보내고 싶은 클라이언트의 id를 to 안에 쓰면 해당하는 사람한테만 emit 할 수 있음
  //io.to(소켓 아이디).emit()
  socket.on("sendMsg", (data) => {
    // msg 받아서 전체 클라이언트한테 전송
    console.log(data);
    if (data.dm == "all") {
      io.emit("send", data.msg);
    } else {
      io.to(data.dm).emit("send", data.msg);
      socket.emit("send", data.msg);
    }
  });
  socket.on("setNick", (nick) => {
    console.log("aaaa", Object.values(client_list));
    // 배열에서 내가원하는 값의 존재여부를 확인할 수 있는 함수 : arr.indexOf()
    // [123,2,3,54,5,2].indexOf(1) = -1
    if (Object.values(client_list).indexOf(nick) > -1) {
      socket.emit("err", "중복되는 닉네임입니다.");
    } else {
      client_list[socket.id] = nick;
      console.log(client_list);
      io.emit("notice", nick);
      socket.emit("entrySuccess", "입장 성공");
      io.emit("clientUpdate", client_list);
    }
  });
  socket.on("disconnect", () => {
    delete client_list[socket.id];
    io.emit("clientUpdate", client_list);
  });
});
http.listen(port, function () {
  console.log("Server port : ", port);
});
