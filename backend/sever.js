require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const config = { autoIndex: true };
const url = "mongodb://localhost:27017/project_AW";

// Import Router
const commentRouter = require("./router/comment.routes");
const eventRouter = require("./router/event.routes");
const participantRouter = require("./router/participant.routes");
const friendRouter = require("./router/friend.routes");
const userRouter = require("./router/user.routes");
const signInRouter = require("./router/signin.routes")
const signUpRouter = require("./router/signup.routes")

// Use Cors Middleware
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Option'],
}));

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, config)
    .then(() => {
        console.log('Connected to MongoDB...');
        app.listen(3000, () => {
            console.log(`Server is running on port 3000`);
        });
    })
    .catch(err => {
        console.log('Cannot connect to MongoDB');
        process.exit(1);
    });

// Use Routers
app.use("/signin", signInRouter);
app.use("/signup", signUpRouter);
app.use("/comment", commentRouter);
app.use("/event", eventRouter);
app.use("/participant", participantRouter);
app.use("/friend", friendRouter);
app.use("/user", userRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Gracefully handle MongoDB disconnection when server stops
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
        process.exit(0);
    } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
    }
}); // for use command : node .\server.js