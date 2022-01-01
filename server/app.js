import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import cors from 'cors'
import "dotenv/config.js";

import postsRoutes from './routes/posts.js'

const app = express();
//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import Routes
app.use('/posts', postsRoutes);

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
mongoose.connect(process.env.DB_CONNECTION, () => 
    console.log('connected to DB!')
)

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
let port = process.env.PORT
if (port == null || port == "") {
    port = 3000;
}
//How do we start listening to the server
app.listen(port, () => console.log('Server running on port: http://localhost:3000'));
// Start the server
