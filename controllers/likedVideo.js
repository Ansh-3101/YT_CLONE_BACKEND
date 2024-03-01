const { where } = require('sequelize');
const LikedVideo = require('../models/LikedVideos');


const getLikedVideos = async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({
            status: "error",
            error: "Not authorized",
        });
    }
    else {
        try {
            const likedVideos = await LikedVideo.findAll({
                where: {
                    userId: user.id
                },
                order: [
                    ['date', 'DESC']
                ]
            });

            return res.status(200).json({
                status: "ok",
                message: "Videos fetched successfully",
                likedVideos
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                error: "Some error occurred",
            });
        }
    }
}


const addLikedVideo = async (req, res) => {
    const user = req.user;
    const { videoId, thumbnail, title, channelId, channelThumbnail, channelTitle } = req.body;

    if (!user) {
        return res.status(401).json({
            status: "error",
            error: "Not authorized",
        });
    }
    else {
        try {
            let likedVideo = await LikedVideo.findOne({
                where: {
                    userId: user.id,
                    videoId
                }
            })

            if (!likedVideo) {
                const likedVideo = await LikedVideo.create({
                    userId: user.id,
                    videoId,
                    thumbnail,
                    title,
                    channelId,
                    channelThumbnail,
                    channelTitle
                });

                return res.status(200).json({
                    status: "ok",
                    message: 'video added successfully',
                    likedVideo,
                    action: "true"
                });
            }

            else {
                return res.status(400).json({
                    status: "error",
                    error: "video already added",
                });
            }

        } catch (error) {
            return res.status(500).json({
                status: "error",
                error: "Some error occurred"
            });
        }
    }
}


const deleteLikedVideo = async (req, res) => {
    const user = req.user;
    const { id } = req.params;


    if (!user || !id) {
        return res.status(401).json({
            status: "error",
            error: "Some error occured",
        });
    }
    else {
        try {
            let likedVideo = await LikedVideo.findOne({
                where: {
                    userId: user.id,
                    videoId: id
                }
            });

            if (likedVideo) {
                const likedVideo = await LikedVideo.destroy({
                    where: {
                        userId: user.id,
                        videoId: id
                    }
                });

                return res.status(200).json({
                    status: "ok",
                    message: "video deleted successfully",
                    action: "false"
                });
            }
            else {
                return res.status(404).json({
                    status: "error",
                    error: "video not found",
                    action: "false"
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "error",
                error: "Some error occurred" + error,
            });
        }
    }
}


const getLikedVideoById = async (req, res) => {
    const user = req.user;
    const { id } = req.params;

    try {
        let likedVideo = await LikedVideo.findByPk(id);

        if (!likedVideo) {
            return res.status(400).json({
                status: "error",
                error: "video not found"
            })
        }

        else {
            const likedVideo = await LikedVideo.findOne({
                where: {
                    userId: user.id,
                    id
                }
            })

            return res.status(200).json({
                status: "ok",
                message: "video fetched successfully",
                likedVideo
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


const getLikedVideoByVideoId = async (req, res) => {
    const user = req.user;
    const { videoId } = req.params;

    try {
        let likedVideo = await LikedVideo.findOne({
            where: {
                userId: user.id,
                videoId
            }
        });

        if (!likedVideo) {
            return res.status(200).json({
                status: "ok",
                error: "video not found",
                action: "false"
            })
        }

        else {
            return res.status(200).json({
                status: "ok",
                message: "video fetched successfully",
                likedVideo,
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

module.exports = {
    addLikedVideo,
    getLikedVideos,
    deleteLikedVideo,
    getLikedVideoById,
    getLikedVideoByVideoId
}