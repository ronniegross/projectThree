const express = require('express')
const logger = require('morgan')
const app = express()
const routes = require('./routes/index.js')


app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(`${__dirname}/client/build`))

// app.get('/', (req, res) => {
//     res.send("hello world")
// })

app.use('/api/fromage', routes)
// app.use('/', routes)
app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
  })

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log('App is running on port ' + PORT)
})