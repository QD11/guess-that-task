import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import { Server } from "socket.io";
import WebSockets from "./utils/WebSockets.js";
import "dotenv/config.js";

// import postsRoutes from './routes/posts.js'
import playersRoutes from './routes/players.js'
import lobbiesRoutes from './routes/lobbies.js'

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
    }
})

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import Routes
// app.use('/posts', postsRoutes);
app.use('/players', playersRoutes);
app.use('/lobbies', lobbiesRoutes);


//ROUTES
app.get('/', (req, res) => {
    res
        .json({ message: 'Welcome' })
        .status(200)
        .end()
});


//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Mongo has connected succesfully')
})
mongoose.connection.on('reconnected', () => {
    console.log('Mongo has reconnected')
})
mongoose.connection.on('error', error => {
    console.log('Mongo connection has an error', error)
mongoose.disconnect()
})
mongoose.connection.on('disconnected', () => {
    console.log('Mongo connection is disconnected')
})
// mongoose.connect()
const PORT = process.env.PORT || 4000
//How do we start listening to the server
// app.listen(port, () => console.log('Server running on port: http://localhost:4000'));
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

const connectedUsers = new Map();

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on("disconnecting", () => {
        console.log('leaving', socket.rooms)
    })
    
    // socket.on('leaveRoom', (room) => {
    //     socket.leave(room);
    //     console.log(`the room ${room} has been left`);
    // });

    socket.on('room', (room, user) => {
        if(socket.room) {
            console.log(socket.room)
            console.log('leaving')
            socket.leave(socket.room);
        }

        if (!connectedUsers.has(room)) {
            connectedUsers.set(room, []);
        }

        if (!connectedUsers.get(room).some(u => u._id === user._id)) {
            connectedUsers.get(room).push(user);
        }

        console.log(`${user.name} joined room ${room}`)

        socket.on('startGame', () => {
            io.in(room).emit("startGame", true)
        })

        socket.on('endGame', () => {
            io.in(room).emit("endGame", false)
        })

        //io.in(room).emit('roomCancelled', true)
        socket.on('roomCanceled', data => {
            io.in(room).emit('goBack', data)
            socket.disconnect()
        })
        socket.room = room;
        socket.join(room);

        socket.to(room).emit('playerJoined', user)

        socket.on('leaveRoom', (user) => {
            console.log(`${user.name} left room`)
            const index = connectedUsers.get(room).findIndex(u => u._id === user._id)
            connectedUsers.get(room).splice(index, 1);
            socket.to(room).emit('playerLeft', user)
            socket.leave(socket.room);
            if (!connectedUsers.get(room).length) {
                // delete key if no more users in room
                connectedUsers.delete(room);
            }
            socket.disconnect()
        });

        // io.in(room).emit("playersInRoom", connectedUsers.get(room))

        socket.to(room).emit("message", `Welcome to lobby ${room}`)

        io.in(room).emit("message", `Welcome ALL to lobby ${room}`)
    })

})
// server.listen(5000, () => console.log('Listening on port *:5000'))
// Start the server
