const express = require("express");
const app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
app.set("view engine", "ejs");
app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// io.on("connection", function (socket) {
//   console.log("Server Socket Connected");
// // socket.on("이벤트명", "정보를 받아서 할 행동");
// // socket.emit(); 하나의 클라이언트에 보냄
// // io.emit(); 모든 클라이언트에 보냄
// // socket.on("welcome", (msg) => {
// //   console.log(msg);
// // });
// socket.emit("welcome from server", {
//   name: "kdt",
//   msg: "(서버) 반가워",
// });

//   socket.on("hello", (data) => {
//     console.log("client:",data);
//     socket.emit("response", "hello : 안녕하세요");
//   });

//   socket.on("study", (data) => {
//     console.log("client:",data);
//     socket.emit("response", "study : 공부합시다!");
//   });

//   socket.on("bye", (data) => {
//     console.log("client:",data);
//     socket.emit("response", "bye : 잘가~");
//   });

// });

io.on("connection", function (socket) {
  io.emit("notice", `${socket.id}가 입장했습니다.`);



  socket.on("send", (msg) => {
    // console.log(msg);
    io.emit("sendMsg", msg);
  });

  socket.on("disconnect", () => {
    io.emit("notice", `${socket.id}가 퇴장했습니다.`);
  });
});

// app.get("/", (req, res) => {
//   res.render("index");
// });

app.get("/", (req, res) => {
  res.render("chat");
});

http.listen(8000, () => {
  console.log("Server open : ", 8000);
});
