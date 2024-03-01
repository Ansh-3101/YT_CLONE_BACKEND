const express = require('express');
require("dotenv").config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./db');
const path = require('path');
const app = express();
app.use(
    express.json({
        verify: (req, res, buf) => {
            req.rawBody = buf;
        },
    })
);


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));



app.get("/", (req, res) => {
    return res.status(200).json({ status: "ok", message: "Server running" });
});
app.use("/public", express.static(path.join(__dirname, "public")));


const userRoutes = require('./routes/user');
const likedVideoRoutes = require('./routes/likedVideo');
const historyRoutes = require('./routes/history');
const subscribeRoutes = require('./routes/subscribe');
const watchLaterRoutes = require('./routes/watchLater');


app.use('/user', userRoutes);
app.use('/likedvideos', likedVideoRoutes);
app.use('/history', historyRoutes);
app.use('/watchlater', watchLaterRoutes);
app.use('/subscribe', subscribeRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, async () => {
    await sequelize.authenticate();
    await sequelize.sync({ alter: process.env.DEVELOPMENT === "true" });
});
