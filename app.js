const express = require('express')
const app = express()
const session = require('express-session')
const routes = require('./routes')
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

app.use('/', routes)

app.listen(port, () => console.log(`App running on port ${port}`))
