const http = require("http");
const fs = require("fs");

const users = fs.readFileSync("./data.json");
const posts = fs.readFileSync("./posts.json");
const bufferHtml = fs.readFileSync("./index.html");
console.log(users);

const httpServer = (req, res) => {
  if (req.url == "/" && req.method === "GET") {
    res.setHeader("Content-type", "text/html");
    res.end(bufferHtml);
  }

  if (req.url == "/users" && req.method === "GET") {
    res.setHeader("Content-type", "application/json");
    res.end(users);
  }

  if (req.url === "/posts" && req.method === "GET") {
    res.setHeader("Content-type", "application/json");
    res.end(posts);
  }

  if (req.url === "/video" && req.method === "GET") {
    const video = fs.readFileSync("./video/video.mp4");
    res.setHeader("Content-type", "application/octet-stream");
    res.end(video);
  }

  if (req.url === "/video/download" && req.method === "GET") {
    const videoFilePath = "./video/video.mp4";
    const videoStream = fs.createReadStream(videoFilePath);
    res.setHeader("Content-type", "application/octet-stream");
    res.setHeader("Content-disposition", "attachment; filename=video.mp4");
    videoStream.pipe(res);
  }
};

const server = http.createServer(httpServer);

server.listen(5000, () => console.log("running"));
