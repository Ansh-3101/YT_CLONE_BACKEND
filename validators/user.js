const signInValidator = (req, res, next) => {
    const { googleToken } = req.body;

    if (!googleToken ||
        typeof googleToken !== "string" ||
        !googleToken.trim()) {

        console.log(req.body);
        return res.status(400).json({
            status: "error",
            error: "Google token is required",
        });
    }
    else {
        next();
    }
}



module.exports = {
    signInValidator
}
