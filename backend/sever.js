require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const config = { autoIndex: true };
const url = "mongodb://localhost:27017/project_AW";

// import router
const commentRouter = require("./router/comment.routes");
const eventRouter = require("./router/event.routes");
const participantRouter = require("./router/participant.routes");
const friendRouter = require("./router/friend.routes");
const userRouter = require("./router/user.routes");

// use cors middleware
app.use(cors({
    origin: 'http://localhost:4200',  // กำหนด origin ที่อนุญาตให้เชื่อมต่อ
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // กำหนดวิธีการที่อนุญาต
    allowedHeaders: ['Content-Type', 'Authorization'],  // กำหนด headers ที่อนุญาต
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

// Use routers
app.use("/comment", commentRouter);
app.use("/event", eventRouter);
app.use("/participant", participantRouter);
app.use("/friend", friendRouter);
app.use("/user", userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});