const Notification = require('../models/Notification')

//@desc get user notifications
//@route GET /notification 
//@access public

const getUserNotificationsHandler = async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            where: {
                UserId: req.user.id,
            },
            order: [['createdAt', 'DESC']]  // latest first  - DESC is used for descending order. ASC is used for ascending order.
        })

        return res.json(notifications)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { getUserNotificationsHandler }