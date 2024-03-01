const WatchLater = require('../models/WatchLater')

const getWatchLater = async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({
            status: "error",
            error: "Some error occured"
        })
    }
    else {
        try {
            const watchLater = await WatchLater.findAll({
                where: {
                    userId: user.id
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })

            return res.status(200).json({
                status: "ok",
                message: "list fetched successfully",
                watchLater
            })
        } catch (error) {
            return res.status(400).json({
                status: "error",
                error: "Some error occurred" + error
            })
        }
    }
}

const getWatchLaterById = async (req, res) => {
    const user = req.user;
    const { id } = req.params;

    if (!user) {
        return res.status(401).json({
            status: "error",
            error: "Some error occured"
        })
    }
    else {
        try {
            const watchLater = await WatchLater.findOne({
                where: {
                    id,
                    userId: user.id
                }
            })

            if (!watchLater) {
                return res.status(400).json({
                    status: "error",
                    error: "video not found"
                })
            }

            else {
                return res.status(200).json({
                    status: "ok",
                    message: "video fetched successfully",
                    watchLater
                })
            }

        } catch (error) {
            return res.status(400).json({
                status: "error",
                error: "Some error occurred"
            })
        }
    }
}

const getWatchLaterByVideoId = async (req, res) => {
    const user = req.user;
    const { videoId } = req.params;

    try {
        const watchLater = await WatchLater.findOne({
            where: {
                userId: user.id,
                videoId
            }
        });

        if (!watchLater) {
            return res.status(200).json({
                status: "error",
                error: "video not found",
                action: "false"
            })
        }
        else {
            return res.status(200).json({
                status: "ok",
                message: "video fetched successfully",
                watchLater,
                action: "true"
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            status: "error",
            error: "Some error occurred"
        })
    }
}


const addWatchLater = async (req, res) => {
    const user = req.user;
    const { videoId, thumbnail, title, channelId, channelThumbnail, channelTitle } = req.body;

    if (!user) {
        return res.status(401).json({
            status: "error",
            error: "Some error occured"
        })
    }
    else {
        try {
            let watchLater = await WatchLater.findOne({
                where: {
                    userId: user.id,
                    videoId
                }
            });

            if (!watchLater) {
                const watchLater = await WatchLater.create({
                    userId: user.id,
                    videoId,
                    thumbnail,
                    title,
                    channelId,
                    channelThumbnail,
                    channelTitle
                })

                return res.status(200).json({
                    status: "ok",
                    message: "video added to watch later",
                    watchLater,
                    action: "true"
                })
            }

            else {
                return res.status(400).json({
                    status: "error",
                    error: "video already added to watch later"
                })
            }

        } catch (error) {
            return res.status(400).json({
                status: "error",
                error: "Some error occurred"
            })
        }
    }
}

const deleteWatchLater = async (req, res) => {
    const user = req.user;
    const { id } = req.params;

    if (!user) {
        return res.status(401).json({
            status: "error",
            error: "Some error occured"
        })
    }
    else {
        try {

            let watchLater = await WatchLater.findOne({
                where: {
                    userId: user.id,
                    videoId: id
                }
            });

            if (!watchLater) {
                return res.status(200).json({
                    status: "error",
                    error: "video not found",
                    action: "false"
                })
            }

            else {
                const watchLater = await WatchLater.destroy({
                    where: {
                        userId: user.id,
                        videoId: id
                    }
                })

                return res.status(200).json({
                    status: "ok",
                    message: "video deleted from watch later",
                    watchLater,
                    action: "false"
                })
            }

        } catch (error) {
            return res.status(400).json({
                status: "error",
                error: "Some error occurred"
            })
        }
    }
}



module.exports = {
    addWatchLater,
    getWatchLater,
    getWatchLaterByVideoId,
    deleteWatchLater,
    getWatchLaterById
}