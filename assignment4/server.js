const express = require('express');
const calcRouter = require('./router/calc');

const app = express();

app.use(express.json())
app.use('/api/calculate', calcRouter)

const PORT = 4001;

app.listen(PORT, (req, res) => {
    console.log(`App listing on port ${PORT}`)
});