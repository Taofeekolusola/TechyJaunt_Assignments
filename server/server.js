const express = require('express')
const userRouter = require('./router.js')
const app = express()

app.use(express.json())
app.use('/v1/users', userRouter)

const PORT = 5500;

app.listen(PORT, (req, res) => {
    console.log(`App listing on port ${PORT}`)
})