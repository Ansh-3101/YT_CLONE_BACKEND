const addLikeValidator = async (req, res, next) => {
    const { videoId, thumbnail, title, channelId, channelThumbnail, channelTitle } = req.body;
    if (!videoId || !thumbnail || !title || !channelId || !channelThumbnail || !channelTitle) {
        return res.status(400).json({
            status: "error",
            message: "Some error occured",
            code: 400,
        });
    }
    next();
}


const deleteLikeValidator = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            status: "error",
            message: "Some error occured",
            code: 400,
        });
    }
    next();
}

module.exports = {
    addLikeValidator,
    deleteLikeValidator
}