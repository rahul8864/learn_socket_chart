import express from 'express';
import http from 'http';
import * as socketio from 'socket.io';

const port = 4001;

const app = express();
const httpServer = http.createServer(app);

const server = new socketio.Server(httpServer, {
    cors: {
        origin: '*',
    }
})

let timeChange

const datas = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    }
  ]

const data = [
    { name: 1, x: Math.random() * 10, y: Math.random() * 10 },
    { name: 2, x: Math.random() * 10, y: Math.random() * 10 },
    { name: 3, x: Math.random() * 10, y: Math.random() * 10 },
    { name: 4, x: Math.random() * 10, y: Math.random() * 10 },
    { name: 5, x: Math.random() * 10, y: Math.random() * 10 }
]

server.on("connection", (socket) => {
    console.log("Connected");
    if(timeChange) clearInterval(timeChange);

    if(data.length > 5) {
        data.reverse().pop();
        data.reverse();
    }
    data.push({ name: data[data.length - 1].name + 1, x: Math.round(Math.random() * 10), y: Math.round(Math.random() * 10) })
    setInterval(() => {
        socket.emit("Message", data)
    },1000)
})

httpServer.listen(port);