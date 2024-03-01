const addWatchLaterValidator = async (req, res, next) => {
    const { videoId, thumbnail, title, channelId, channelThumbnail, channelTitle } = req.body;

    if (!videoId || !thumbnail || !title || !channelId || !channelThumbnail || !channelTitle) {
        return res.status(400).json({
            status: "error",
            error: "Some error occurred",
        });
    }
    else {
        next();
    }
}

const deleteWatchLaterValidator = async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            status: "error",
            error: "Some error occurred",
        });
    }
    else {
        next();
    }
}


module.exports = {
    addWatchLaterValidator,
    deleteWatchLaterValidator
}