const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const config = { autoIndex: true, };
const url = "mongodb://localhost:27017/project_AW"

// import router
const commentRouter = require("./router/comment.routes")
const eventRouter = require("./router/event.routes")
const participantRouter = require("./router/participant.routes")

// use cors middleware
app.use(cors({
    origin: 'http://localhost:4200',  // กำหนด origin ที่อนุญาตให้เชื่อมต่อ
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // กำหนดวิธีการที่อนุญาต
    allowedHeaders: ['Content-Type', 'Authorization'],  // กำหนด headers ที่อนุญาต
}));

app.use(express.json());

// open + middleware
app.use((req, res, next) => {
    mongoose.connect(url, config)
        .then(() => {
            console.log('Connected to MongoDB...');
            next();
        })
        .catch(err => {
            console.log('Cannot connect to MongoDB');
            res.status(501).send('Cannot connect to MongoDB');
        });
});

// router 
app.use("/comment", commentRouter)
app.use("/event", eventRouter)
app.use("/participant", participantRouter)

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});