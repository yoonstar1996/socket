const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 8000;
app.set("view engine", "ejs");
app.get("/", function (req, res) {
  res.render("index2");
});
var msg = { hello: "안녕하세요?", study: "공부합시다~", bye: "안녕히가세요~" };
io.on("connection", function (socket) {


  // 효율적인 방법
  socket.on("send", function (data) {
    // data로 hello가 들어왔을 때
    console.log("client : ", data);
    socket.emit("response", data + " : " + msg[data]);
  });
  
  // 같은 동작을 각각의 함수로 따로 만든 경우 -> 비효율적
  // socket.on("hello", function(data){
  //     console.log( "client : ", data );
  //     socket.emit("response", "hello : 안녕하세요?");
  // });
  // socket.on("study", function(data){
  //     console.log( "client : ", data );
  //     socket.emit("response", "study : 공부합시다~");
  // })
  // socket.on("bye", function(data){
  //     console.log( "client : ", data );
  //     socket.emit("response", "bye : 안녕히가세요~");
  // })
});
http.listen(port, function () {
  console.log("Server port : ", port);
});
