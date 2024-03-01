const Subscriptions = require('../models/Subscribe');


const getAllSubscriptions = async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({
            status: "error",
            error: "Some error occured"
        })
    }
    else {
        try {
            const subscriptions = await Subscriptions.findAll({
                where: {
                    userId: user.id
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            console.log(subscriptions)
            return res.status(200).json({
                status: "ok",
                message: "subscriptions fetched successfully",
                subscriptions
            })
        } catch (error) {
            return res.status(400).json({
                status: "error",
                error: "Some error occurred"
            })
        }
    }
}


const getSubById = async (req, res) => {
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
            const subscription = await Subscriptions.findOne({
                where: {
                    id,
                    userId: user.id
                }
            });

            if (!subscription) {
                return res.status(400).json({
                    status: "error",
                    error: "subscription not found"
                })
            }
            else {
                return res.status(200).json({
                    status: "ok",
                    message: "subscription fetched successfully",
                    subscription,

                })
            }


        } catch (error) {
            return res.status(400).json({
                status: "error",
                error: "Some error occurred" + error
            })
        }
    }
}


const addSubscription = async (req, res) => {
    const user = req.user;
    const { channelId, channelTitle, channelThumbnail } = req.body;

    if (!user) {
        return res.status(401).json({
            status: "error",
            error: "Some error occured"
        })
    }
    else {
        try {

            let subscription = await Subscriptions.findOne({
                where: {
                    userId: user.id,
                    channelId
                }
            })

            if (!subscription) {

                const subscription = await Subscriptions.create({
                    userId: user.id,
                    channelId,
                    channelTitle,
                    channelThumbnail
                })

                return res.status(200).json({
                    status: "ok",
                    message: "subscription added successfully",
                    subscription,
                    action: "true"
                })
            }
            else {
                return res.status(400).json({
                    status: "error",
                    error: "subscription already added",
                    action: "true"
                })
            }


        } catch (error) {
            return res.status(400).json({
                status: "error",
                error: "Some error occurred" + error
            })
        }
    }
}


const deleteSubscription = async (req, res) => {
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
            const subscription = await Subscriptions.destroy({
                where: {
                    userId: user.id,
                    channelId: id
                }
            })

            if (!subscription) {
                return res.status(400).json({
                    status: "error",
                    error: "subscription not found"
                })
            }
            else {
                return res.status(200).json({
                    status: "ok",
                    message: "subscription deleted successfully",
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

const getSubByChannelId = async (req, res) => {
    const user = req.user;
    const { channelId } = req.params;

    try {
        let subscription = await Subscriptions.findOne({
            where: {
                userId: user.id,
                channelId
            }
        })

        if (!subscription) {
            return res.status(200).json({
                status: "ok",
                message: "subscription not found",
                action: "false"
            })
        }

        else {
            return res.status(200).json({
                status: "ok",
                message: "Subscribed",
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
    getAllSubscriptions,
    getSubById,
    getSubByChannelId,
    addSubscription,
    deleteSubscription
}