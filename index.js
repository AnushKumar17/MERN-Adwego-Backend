const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const addRoute = require('./routes/adds');
const commentRoute = require('./routes/comments');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB 'Adds' is connected.");
    } catch (error) {
        console.log("Error in index.js file", error);
    }
};

// Middlewares
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
    origin: "http://localhost:3000", 
    credentials: true 
}));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/adds", addRoute);
app.use("/api/comments", commentRoute);

app.listen(process.env.PORT, () => {
    connectDB();
    console.log("App is running.");
});
