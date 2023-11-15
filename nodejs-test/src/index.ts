import express from 'express';
import { json } from 'body-parser';
import { Server as SocketIoServer, Socket } from "socket.io";
import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import cors from 'cors';

const app = express();
app.use(json());
app.use(cors());

const server = createServer(function (req, res) {
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body>Test success!</body></html>');
        res.end();
    }
})

server.listen("2345", () => {
    console.log('Server listening at port %d', "2345");
});

const socketio = new SocketIoServer(server, {
    // pingInterval: 1000,
    // pingTimeout: 1000,
    allowEIO3: true,
    cors: {
        credentials: true,
        methods: ["GET", "POST"]
    }
})

socketio.on('connection', (socket) => {
    socket.on('test-emit', () => {
        console.log('test ok!');
    });

    socket.emit('socket-on', 'yoyoyo')
});

app.get('/events', (req: any, res: { send: (arg0: string) => void; }) => {
    res.send('Hi there!');
});

app.listen(4000, () => {
    console.log('Listening on 4000');
});