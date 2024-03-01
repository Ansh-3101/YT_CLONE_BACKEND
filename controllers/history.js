const History = require('../models/History')

const addToHistory = async (req, res) => {
    const user = req.user;
    const { videoId, thumbnail, title, channelId, channelThumbnail, channelTitle } = req.body;

    if (!user || !videoId || !thumbnail || !title || !channelId || !channelThumbnail || !channelTitle) {

        return res.status(401).json({
            status: "error",
            error: "Some error occured",
        });
    }
    else {
        try {
            let history = await History.findOne({
                where: {
                    userId: user.id,
                    videoId
                }
            });

            if (!history) {
                const history = await History.create({
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
                    message: 'added to history',
                    video: history
                });
            }
            else {
                history.update(
                    { date: new Date() },
                    {
                        where:
                        {
                            userId: user.id,
                            videoId
                        }
                    });

                return res.status(200).json({
                    status: "ok",
                    message: 'history updated successfully',
                    video: history
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

const getHistory = async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({
            status: "error",
            error: "Not authorized",
        });
    }
    else {
        try {
            const history = await History.findAll({
                where: {
                    userId: user.id
                },
                order: [
                    ['updatedAt', 'DESC']
                ]
            });

            return res.status(200).json({
                status: "ok",
                message: "history fetched successfully",
                history
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                error: "Some error occurred" + error,
            });
        }
    }
}

const deleteHistory = async (req, res) => {
    const user = req.user;
    const { id } = req.params;

    if (!user || !id) {
        return res.status(401).json({
            status: "error",
            error: "Some error occured"
        });
    }
    else {
        try {

            let history = await History.findByPk(id);

            if (history) {
                const history = await History.destroy({
                    where: {
                        id,
                        userId: user.id
                    }
                });

                return res.status(200).json({
                    status: "ok",
                    message: 'deleted from history'
                });
            }
            else {
                return res.status(401).json({
                    status: "error",
                    error: "history does not exist",
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

module.exports = {
    addToHistory,
    getHistory,
    deleteHistory
}