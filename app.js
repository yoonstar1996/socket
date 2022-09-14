const express = require("express");
const app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

io.on("connection", function (socket) {
  console.log("Server Socket Connected");
});

app.get("/", (req, res) => {
  res.render("index");
});

http.listen(8000, () => {
  console.log("Server open : ", 8000);
});
