const express = require('express')
const logger = require('morgan')
const app = express()
const routes = require('./routes/index.js')


app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.get('/', (req, res) => {
//     res.send("hello world")
// })

// app.use('/api/fromage', routes)
app.use('/', routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('App is running on port ' + PORT)
})