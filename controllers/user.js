const User = require('../models/User');
const WatchLater = require('../models/WatchLater');
const LikedVideos = require('../models/LikedVideos');
const Subscriptions = require('../models/Subscribe');
const History = require('../models/History');

const { OAuth2Client } = require("google-auth-library");
const { generateUserToken } = require('../utils/generateToken');

const signIn = async (req, res) => {
    const googleToken = req.body.googleToken;
    console.log(googleToken);
    try {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        let { name, email, picture } = ticket.getPayload();

        try {
            let user = await User.findOne({ where: { email } });

            if (!user) {
                const user = await User.create({
                    email,
                    name: name,
                    iconUrl: picture,
                });

                const token = generateUserToken(email);
                res.cookie("JWT_TOKEN", token, {
                    maxAge: process.env.AUTH_EXPIRE_DAYS * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });

                res.status(200).json({
                    status: "ok",
                    message: "Signup successfull",
                    code: 200,
                    user,
                    token
                });
            }
            else {
                const token = generateUserToken(email);

                res.cookie("JWT_TOKEN", token, {
                    maxAge: process.env.AUTH_EXPIRE_DAYS * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });


                return res.status(200).json({
                    status: "ok",
                    message: "Login successfull",
                    code: 200,
                    user,
                    token
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "error",
                error: "Some error occurred" + error,
            });
        }
    } catch (error) {
        return res.status(401).json({
            status: "error",
            error: "Invalid token" + error,
        });
    }
}

const signOut = (req, res) => {
    res.cookie("JWT_TOKEN", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

    return res.status(200).json({
        status: "ok",
        message: "Logged out",
    });
}

const getSelf = async (req, res) => {
    let user = req.user;

    try {
        if (!user) {

            return res.status(404).json({
                status: "error",
                error: "User not found",
            });

        } else {
            const user = await User.findOne({ where: { email: req.user.email } });
            // let subscriptions = await Subscriptions.findAll({ where: { userId: user.id } });
            // let watchLater = await WatchLater.findAll({ where: { userId: user.id } });
            // let likedVideos = await LikedVideos.findAll({ where: { userId: user.id } });
            // let history = await History.findAll({ where: { userId: user.id } });

            return res.status(200).json({
                status: "ok",
                message: "Details fetched successfully",
                user,
                // likedVideos,
                // subscriptions,
                // watchLater,
                // history
            });
        }
    } catch (error) {

        res.status(500).json({
            status: "error",
            error: "Some error occurred",
        });
    }
}

const getStats = async (req, res) => {
    let user = req.user;

    try {
        if (!user) {

            return res.status(404).json({
                status: "error",
                error: "User not found",
            });

        } else {
            const user = await User.findOne({ where: { email: req.user.email } });
            let subscriptions = await Subscriptions.findAll({ where: { userId: user.id } });
            let watchLater = await WatchLater.findAll({ where: { userId: user.id } });
            let likedVideos = await LikedVideos.findAll({ where: { userId: user.id } });


            return res.status(200).json({
                status: "ok",
                message: "Details fetched successfully",
                user,
                likedVideosCount: likedVideos.length,
                subscriptionsCount: subscriptions.length,
                watchLaterCount: watchLater.length,
            });
        }
    } catch (error) {

        res.status(500).json({
            status: "error",
            error: "Some error occurred",
        });
    }
}

module.exports = {
    signIn,
    signOut,
    getSelf,
    getStats
}