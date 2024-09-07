const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = { autoIndex: true, };
const url = "mongodb://localhost:27017/project_AW"

// import router
const commentRouter = require("./router/comment.routes")
const eventRouter = require("./router/event.routes")

app.use(express.json());
// middleware
app.use(function (req, res, next) {
    // Website you wish to allow to connect     
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Pass to next layer of middleware     
    next();
});
// open + middleware
app.use((req, res, next) => {
    mongoose.connect(url, config)
        .then(() => {
            console.log('Connected to MongoDB...');
            next();
        })
        .catch(err => {
            console.log('Cannot connect to MongoDB');
            res.status(501).send('Cannot connect to MongoDB')
        });
})

// router 
app.use("/comment", commentRouter)
app.use("/event", eventRouter)

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});