const sharedControllerHandler = (req, res) => {
    res.status(200).json({ message: 'Server is working perfectly' })
}

module.exports = {sharedControllerHandler}