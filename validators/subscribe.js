const addSubValidator = async (req, res, next) => {
    const { channelId, channelTitle, channelThumbnail } = req.body;

    if (!channelId || !channelTitle || !channelThumbnail) {
        console.log(channelId, channelTitle, channelThumbnail)
        return res.status(400).json({
            status: "error",
            error: "Some error occurred",
        });
    }
    else {
        next();
    }
}

const deleteSubValidator = async (req, res, next) => {
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
    addSubValidator,
    deleteSubValidator
}