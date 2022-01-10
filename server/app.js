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

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

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

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
let port = process.env.PORT
if (port == null || port == "") {
    port = 4000;
}
//How do we start listening to the server
app.listen(port, () => console.log('Server running on port: http://localhost:4000'));
// Start the server
